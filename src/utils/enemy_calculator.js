const SINGLE_SPAWN_RATE = `%		T1	T2	T3	T4	T5	T6	T7	T8	T9	T10	T11	T12	T13	T14	T15	T16	T17	T18
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
33%		8000	7200	6480	5832	5249	4724	4252	3826	3444	3099	2789	2510	2259	2033	1830	1,441	1,297	1,167`;

const DOUBLE_SPAWN_RATE = `%		T1	T2	T3	T4	T5	T6	T7	T8	T9	T10	T11	T12	T13	T14	T15	T16	T17	T18
0.33%		8000	7200	6480	5832	5249	4724	4252	3826	3444	3099	2789	2510	2259	2033	1830	1,441	1,297	1,167
1.33%		9000	8100	7290	6561	5905	5314	4783	4305	3874	3487	3138	2824	2542	2288	2059	1,647	1,482	1,334
3%		10000	9000	8100	7290	6561	5905	5314	4783	4305	3874	3487	3138	2824	2542	2288	1,853	1,667	1,500
5%		11000	9900	8910	8019	7217	6495	5846	5261	4735	4262	3835	3452	3107	2796	2516	2,058	1,853	1,667
8%		12000	10800	9720	8748	7873	7086	6377	5740	5166	4649	4184	3766	3389	3050	2745	2,264	2,038	1,834
12%		13000	11700	10530	9477	8529	7676	6909	6218	5596	5036	4533	4080	3672	3304	2974	2,470	2,223	2,001
16%		14000	12600	11340	10206	9185	8267	7440	6696	6027	5424	4881	4394	3954	3559	3203	2,676	2,408	2,168
21%		15000	13500	12150	10935	9841	8857	7972	7174	6457	5811	5230	4708	4236	3813	3432	2,882	2,594	2,334
27%		16000	14400	12960	11664	10497	9448	8503	7653	6887	6199	5579	5022	4519	4067	3660	3,088	2,779	2,501
33%		17000	15300	13770	12393	11153	10038	9034	8131	7318	6586	5928	5336	4801	4321	3889	3,294	2,964	2,668`;

const wave_rates = [
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
];

function twoDimDataParser(wikiData) {
    const lines = wikiData.split("\n");
    const header = lines[0].split("\t").filter(item => item !== "");
    const npArr = new Array(lines.length).fill(null).map(() => new Array(header.length).fill(null));

    npArr[0] = header;

    for (let i = 1; i < lines.length; i++) {
        const lineCell = lines[i].split("\t").filter(item => item !== "");
        npArr[i] = lineCell;
    }

    return npArr;
}

const singleEliteSpawn = twoDimDataParser(SINGLE_SPAWN_RATE);
const doubleEliteSpawn = twoDimDataParser(DOUBLE_SPAWN_RATE);
const waveNumbers = wave_rates.map(row => row[0]).reverse();
const waveData = wave_rates.map(row => row.slice(1)).reverse();
const eb = [1, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
const elitePerc = [0.0, 0.01, 0.04, 0.09, 0.16, 0.25, 0.36, 0.49, 0.64, 0.81, 1.0, 1.01, 1.04, 1.09, 1.16, 1.25, 1.36, 1.49, 1.64, 1.81, 2.0];

function normalEnemyCalculator(wave, tier = 1, enemyBalanceLevel = 0) {
    let waveNumbersIdx = 0;

    for (let i = 0; i < waveNumbers.length - 1; i++) {
        if (wave > waveNumbers[i]) {
            waveNumbersIdx++;
        }
    }

    let basic = 0;
    let fast = 0;
    let tank = 0;
    let ranged = 0;
    let boss = 0;
    
    const ebMult = eb[enemyBalanceLevel];

    for (let curWavSet = 0; curWavSet < waveNumbersIdx; curWavSet++) {
        const intervalWave = waveNumbers[curWavSet + 1] - waveNumbers[curWavSet];
        const curWaveData = waveData[curWavSet];
        const spawnRatePer1Over8Sec = curWaveData[3] * 0.01;
        const basicRate = (100 - curWaveData[0] - curWaveData[1] - curWaveData[2]) * 0.01;
        const fastRate = curWaveData[0] * 0.01;
        const tankRate = curWaveData[1] * 0.01;
        const rangedRate = curWaveData[2] * 0.01;
        const spawn = intervalWave * 26 * 8 * spawnRatePer1Over8Sec * ebMult;

        basic += spawn * basicRate;
        fast += spawn * fastRate;
        tank += spawn * tankRate;
        ranged += spawn * rangedRate;
    }

    const remainingWave = wave - waveNumbers[waveNumbersIdx];
    const curWaveData = waveData[waveNumbersIdx];
    const spawnRatePer1Over8Sec = curWaveData[3] * 0.01;
    const basicRate = (100 - curWaveData[0] - curWaveData[1] - curWaveData[2]) * 0.01;
    const fastRate = curWaveData[0] * 0.01;
    const tankRate = curWaveData[1] * 0.01;
    const rangedRate = curWaveData[2] * 0.01;
    const spawn = remainingWave * 26 * 8 * spawnRatePer1Over8Sec;

    basic += spawn * basicRate;
    fast += spawn * fastRate;
    tank += spawn * tankRate;
    ranged += spawn * rangedRate;

    const wavePerBoss = 10 - Math.max(0, tier - 13);
    boss = Math.floor(wave / wavePerBoss);

    return {
        "basic&protector": Math.round(basic),
        "fast": Math.round(fast),
        "tank": Math.round(tank),
        "ranged": Math.round(ranged),
        "boss": Math.round(boss)
    };
}

function eliteEnemyCalculator(wave, tier) {
    let countedWave = 0;
    const singleTierCount = singleEliteSpawn.slice(1).map(row => row[tier]);
    const doubleTierCount = doubleEliteSpawn.slice(1).map(row => row[tier]);
    const concatCount = singleTierCount.concat(doubleTierCount).map(parseFloat);

    let elite = 0;
    let curEliteRateIdx = 0;
    let continueCalculation = true;

    while (continueCalculation) {
        const lowerThreshold = concatCount[curEliteRateIdx];
        const higherThreshold = (curEliteRateIdx + 1 < concatCount.length) ? concatCount[curEliteRateIdx + 1] : wave;

        if (wave <= higherThreshold) {
            continueCalculation = false;
        }

        const intervalWave = Math.min(higherThreshold, wave) - lowerThreshold;
        const curEliteRatePerWave = elitePerc[curEliteRateIdx];
        const spawnedElite = 1.0 * curEliteRatePerWave * intervalWave;

        elite += spawnedElite;
        curEliteRateIdx++;
    }

    return {
        "vampire": Math.floor(elite / 3),
        "ray": Math.floor(elite / 3),
        "scatter": Math.floor(elite * 31 / 3)
    };
}

// for (let i = 0; i < 12000; i += 1000) {
//     console.log(`Wave ${i}:`, normalEnemyCalculator(i));
//     console.log(`Wave ${i} elite:`, eliteEnemyCalculator(i, 9));
// }

let i = 12000
console.log(`Wave ${i}:`, normalEnemyCalculator(i));