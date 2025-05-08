import numpy as np

SINGLE_SPAWN_RATE = """%		T1	T2	T3	T4	T5	T6	T7	T8	T9	T10	T11	T12	T13	T14	T15	T16	T17	T18
0%		0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
0.33%		500	450	405	365	328	295	266	239	215	194	174	157	141	127	114	41	37	33
1.33%		1000	900	810	729	656	590	531	478	430	387	349	314	282	254	229	102	92	83
3%		1500	1350	1215	1094	984	886	797	717	646	581	523	471	424	381	343	205	185	166
5%		2000	1800	1620	1458	1312	1181	1063	957	861	775	697	628	565	508	458	308	277	250
8%		3000	2700	2430	2187	1968	1771	1594	1435	1291	1162	1046	941	847	763	686	411	370	333
12%		4000	3600	3240	2916	2624	2362	2126	1913	1722	1550	1395	1255	1130	1017	915	617	555	500
16%		5000	4500	4050	3645	3281	2952	2657	2391	2152	1937	1743	1569	1412	1271	1144	823	741	667
21%		6000	5400	4860	4374	3937	3543	3189	2870	2583	2325	2092	1883	1695	1525	1373	1,029	926	833
27%		7000	6300	5670	5103	4593	4133	3720	3348	3013	2712	2441	2197	1977	1779	1601	1,235	1,111	1,000
33%		8000	7200	6480	5832	5249	4724	4252	3826	3444	3099	2789	2510	2259	2033	1830	1,441	1,297	1,167
"""

DOUBLE_SPAWN_RATE = """%		T1	T2	T3	T4	T5	T6	T7	T8	T9	T10	T11	T12	T13	T14	T15	T16	T17	T18
0.33%		8000	7200	6480	5832	5249	4724	4252	3826	3444	3099	2789	2510	2259	2033	1830	1,441	1,297	1,167
1.33%		9000	8100	7290	6561	5905	5314	4783	4305	3874	3487	3138	2824	2542	2288	2059	1,647	1,482	1,334
3%		10000	9000	8100	7290	6561	5905	5314	4783	4305	3874	3487	3138	2824	2542	2288	1,853	1,667	1,500
5%		11000	9900	8910	8019	7217	6495	5846	5261	4735	4262	3835	3452	3107	2796	2516	2,058	1,853	1,667
8%		12000	10800	9720	8748	7873	7086	6377	5740	5166	4649	4184	3766	3389	3050	2745	2,264	2,038	1,834
12%		13000	11700	10530	9477	8529	7676	6909	6218	5596	5036	4533	4080	3672	3304	2974	2,470	2,223	2,001
16%		14000	12600	11340	10206	9185	8267	7440	6696	6027	5424	4881	4394	3954	3559	3203	2,676	2,408	2,168
21%		15000	13500	12150	10935	9841	8857	7972	7174	6457	5811	5230	4708	4236	3813	3432	2,882	2,594	2,334
27%		16000	14400	12960	11664	10497	9448	8503	7653	6887	6199	5579	5022	4519	4067	3660	3,088	2,779	2,501
33%		17000	15300	13770	12393	11153	10038	9034	8131	7318	6586	5928	5336	4801	4321	3889	3,294	2,964	2,668
"""

wave_rates = [
    [6500, 24, 22, 21, 56],
    [6000, 24, 21, 20, 54],
    [5500, 23, 21, 19, 52],
    [5000, 22, 20, 19, 50],
    [4500, 21, 20, 19, 49],
    [4000, 21, 20, 18, 48],
    [3500, 20, 19, 17, 46],
    [3000, 19, 19, 16, 44],
    [2500, 18, 18, 15, 42],
    [2000, 17, 17, 14, 40],
    [1500, 15, 16, 14, 39],
    [1250, 15, 16, 11, 38],
    [1000, 14, 15, 11, 37],
    [800, 13, 14, 11, 36],
    [750, 13, 14, 10, 34],
    [600, 13, 14, 10, 34],
    [400, 13, 13, 9, 32],
    [320, 12, 13, 8, 30],
    [300, 12, 13, 8, 30],
    [250, 12, 12, 7, 28],
    [200, 11, 11, 7, 26],
    [160, 11, 10, 6, 24],
    [150, 11, 10, 6, 24],
    [100, 10, 9, 6, 22],
    [80, 10, 8, 5, 20],
    [60, 9, 8, 4, 19],
    [40, 8, 7, 3, 17],
    [20, 7, 6, 2, 15],
    [6, 6, 4, 1, 13],
    [3, 5, 2, 0, 11],
    [0, 5, 0, 0, 10]
]

def two_dim_data_parser(wiki_data:str):
    lines = wiki_data.splitlines()
    
    header = [i for i in lines[0].split("\t") if i != ""]
    np_arr = np.zeros((len(lines), len(header)), dtype=object)
    np_arr[0] = np.array(header)
    
    count = 1
    for line in lines[1:]:
        line_cell = line.split("\t")
        line_cell = [i for i in line_cell if i != ""]
        np_arr[count] = np.array(line_cell)
        count += 1
    
    return np_arr

single_elite_spawn = two_dim_data_parser(SINGLE_SPAWN_RATE)
double_elite_spawn = two_dim_data_parser(DOUBLE_SPAWN_RATE)
wave_numbers = np.flipud(np.array([row[0] for row in wave_rates]))
wave_data = np.flipud(np.array([row[1:] for row in wave_rates]))
eb = np.array([1,1.3,1.4,1.5,1.6,1.7,1.8,1.9])
elite_perc = np.array([0.0, 0.01, 0.04, 0.09, 0.16, 0.25, 0.36, 0.49, 0.64, 0.81, 1.0, 1.01, 1.04, 1.09, 1.16, 1.25, 1.36, 1.49, 1.64, 1.81, 2.0])

def normal_enemy_calculator(wave:int, tier:int = 1, enemy_balance_level:int = 0) -> dict[str, int]:
    wave_numbers_idx = 0
    for wave_number in wave_numbers[:-1]:
        if wave > wave_number:
            wave_numbers_idx += 1
    
    basic = 0
    fast = 0
    tank = 0
    ranged = 0
    boss = 0
    
    eb_mult = eb[enemy_balance_level]
    
    for cur_wav_set in range(wave_numbers_idx):
        interval_wave = wave_numbers[cur_wav_set+1] - wave_numbers[cur_wav_set] 
        cur_wave_data = wave_data[cur_wav_set]
        
        spawn_rate_per_1_over_8_sec = cur_wave_data[3] * 0.01
        
        basic_rate = (100 - cur_wave_data[0] - cur_wave_data[1] - cur_wave_data[2])*0.01
        fast_rate = cur_wave_data[0] * 0.01
        tank_rate = cur_wave_data[1] * 0.01
        ranged_rate = cur_wave_data[2] * 0.01
        
        spawn = interval_wave * 26 * 8 * spawn_rate_per_1_over_8_sec * eb_mult
        
        basic += spawn * basic_rate 
        fast += spawn * fast_rate
        tank += spawn * tank_rate
        ranged += spawn * ranged_rate
    
    remaining_wave = wave - wave_numbers[wave_numbers_idx]
    cur_wave_data = wave_data[wave_numbers_idx]
        
    spawn_rate_per_1_over_8_sec = cur_wave_data[3] * 0.01
    
    basic_rate = (100 - cur_wave_data[0] - cur_wave_data[1] - cur_wave_data[2])*0.01
    fast_rate = cur_wave_data[0] * 0.01
    tank_rate = cur_wave_data[1] * 0.01
    ranged_rate = cur_wave_data[2] * 0.01
    
    spawn = remaining_wave * 26 * 8 * spawn_rate_per_1_over_8_sec
    
    basic += spawn * basic_rate
    fast += spawn * fast_rate
    tank += spawn * tank_rate
    ranged += spawn * ranged_rate
    
    wave_per_boss = 10 - max(0, tier - 13)
    boss = wave // wave_per_boss
    
    return {
        "basic & protector": int(basic),
        "fast": int(fast),
        "tank": int(tank),
        "ranged": int(ranged),
        "boss": int(boss)
    }
    

def elite_enemy_calculator(wave:int, tier:int) -> dict[str, int]:
    counted_wave = 0
    single_tier_count = single_elite_spawn[1:, tier]
    double_tier_count = double_elite_spawn[1:, tier]
    concat_count = np.concatenate((single_tier_count, double_tier_count)).astype(float)
    
    elite = 0
    cur_elite_rate_idx = 0
    continue_calculation = True
    
    while continue_calculation:
        lower_threshold = concat_count[cur_elite_rate_idx]
        higher_threshold = concat_count[cur_elite_rate_idx+1] if cur_elite_rate_idx+1 < len(concat_count) else wave
        if wave <= higher_threshold:
            continue_calculation = False
        
        interval_wave = min(higher_threshold, wave) - lower_threshold
        cur_elite_rate_per_wave = elite_perc[cur_elite_rate_idx]
        spawned_elite = 1.0 * cur_elite_rate_per_wave * interval_wave
        
        # print(f"threshold {lower_threshold}-{higher_threshold}, interval_wave {interval_wave}, cur_rate {cur_elite_rate_per_wave}, spawned_elite {spawned_elite}")
        elite += spawned_elite
        cur_elite_rate_idx += 1
    
    return {
        "vampire": int(elite//3),
        "ray": int(elite//3),
        "scatter": int(elite*31//3)
    }
    
def total_enemy_calculator(wave:int, tier:int = 1, enemy_balance_level:int = 0) -> dict[str, int] | str:
    if wave < 0:
        return "Wave error!"
    if tier < 1 or tier > 18:
        return "Tier Error!"
    if enemy_balance_level < 0 or enemy_balance_level > 7:
        return "Enemy balance level Error!"
    
    normal = normal_enemy_calculator(wave=wave, tier=tier, enemy_balance_level=enemy_balance_level)
    elite = elite_enemy_calculator(wave=wave, tier=tier)
    
    return normal | elite

if __name__ == "__main__":
    # for i in range(0, 2000, 100):
    #     print(f"Wave {i}:", normal_enemy_calculator(i))
    #     print(f"Wave {i} elite:", elite_enemy_calculator(i, 1))
        
    print(total_enemy_calculator(10000,1,7))