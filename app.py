from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from utils.enemy_calculator import total_enemy_calculator
from utils.game_rumtime_calculator import game_runtime_in_sec, sec2hr_converter
from utils.resource_calculator import total_resource_gain
import os

app = Flask(__name__)
CORS(app, resources={r"/calculate": {"origins": ["https://thetower-theoreticaltiershouldifarm.onrender.com", "http://localhost:5000"]}})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    wave = int(data['wave'])
    tier = int(data['tier'])
    enemy_balance = int(data['enemyBalance'])
    intro_sprint = int(data['introSprint'])
    ws_level = int(data['wsLevel'])
    wa_level = int(data['waLevel'])
    spb_level = int(data['spbLevel'])
    gameSpeedPerkWave = int(data['gameSpeedPerkWave'])
    
    # Calculate enemies
    enemies = total_enemy_calculator(wave, tier, enemy_balance)
    if isinstance(enemies, str):
        return jsonify({"error": enemies}), 400
        
    # Calculate game time
    game_time_secs = game_runtime_in_sec(
        wave, 
        intro_sprint_wave=intro_sprint,
        ws_lvl=ws_level,
        wa_lvl=wa_level,
        spb_lvl=spb_level,
        fast_threshold=gameSpeedPerkWave
    )
    if isinstance(game_time_secs, str):
        return jsonify({"error": game_time_secs}), 400
        
    game_time = sec2hr_converter(game_time_secs)
    
    # Calculate resources
    resources = total_resource_gain(enemies, tier)
    if isinstance(resources, str):
        return jsonify({"error": resources}), 400
        
    # Calculate per hour rates
    hours = game_time_secs / 3600
    coin_per_hour = int(resources['coin'] / hours) if hours > 0 else 0
    cell_per_hour = int(resources['cell'] / hours) if hours > 0 else 0
    
    return jsonify({
        "gameTime": game_time,
        "baseCoin": resources['coin'],
        "coinPerHour": coin_per_hour,
        "baseCell": resources['cell'],
        "cellPerHour": cell_per_hour,
        "enemies": enemies
    })

if __name__ == '__main__':
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5000))
    app.run(host=host, port=port, debug=os.getenv('FLASK_ENV') == 'development')