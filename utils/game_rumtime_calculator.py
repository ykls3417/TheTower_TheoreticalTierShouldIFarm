ws_value = [0, 0.09, 0.1, 0.11, 0.13, 0.15, 0.17, 0.19]
wa_value = [1, 1.3, 1.34, 1.38, 1.42, 1.46, 1.5, 1.54]
is_wave = [0, 20, 30, 40, 50, 60, 80, 100, 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800]

def sec2hr_converter(input:int) -> str:
    min = input // 60
    hour = min // 60
    int = input % 60
    min = min % 60
    str = f"{hour}h {min}m {int}s"
    return str

def game_runtime_in_sec(wave:int, intro_sprint_wave: int = 0, ws_lvl: int = 0, wa_lvl: int = 0, spb_lvl: int = 0, game_time = False) -> int | str:
    if ws_lvl < 0 or ws_lvl > 7:
        return "Wave skip level error!"
    if wa_lvl < 0 or wa_lvl > 7:
        return "Wave acceleration level error!"
    if spb_lvl < 0 or spb_lvl > 25:
        return "Standard perk bonus level error!"
    if intro_sprint_wave not in is_wave:
        return "Intro sprint wave count error!"
    
    this_wa_value = wa_value[wa_lvl]
    this_ws_value = ws_value[ws_lvl]
    
    fast_threshold = 800
    slow_wave = 0
    fast_wave = 0
    
    for i in range(1, wave + 1):
        if (i > intro_sprint_wave or i % 10 == 0):
            if i < fast_threshold:
                slow_wave += 1
            else:
                fast_wave += 1
    
    sec_per_wave = (26 + 9 / this_wa_value) * (1 - this_ws_value)
    
    slow_game_speed = 4
    fast_game_speed = 4 + (1 + spb_lvl/100) / 1.25
    est_game_time = slow_wave * sec_per_wave + fast_wave * sec_per_wave
    real_time = slow_wave * sec_per_wave / slow_game_speed + fast_wave * sec_per_wave / fast_game_speed
    
    return int(est_game_time) if game_time else int(real_time)

if __name__ == "__main__":
    for i in range(1000, 20001, 1000):
        print(f"wave {i}:", sec2hr_converter(game_runtime_in_sec(i, intro_sprint_wave=1800)))