base_cell = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 10.5, 13, 14, 14.5, 15]
base_coin = [1.0, 1.8, 2.6, 3.4, 4.2, 5.0, 5.8, 6.6, 7.5, 8.7, 10.3, 12.2, 14.7, 17.6, 21.3, 25.2, 29.1, 33.0]

def base_coin_gain(kill_count: dict[str, int], tier: int=0) -> int:
    sum = 0
    sum += kill_count['basic & protector']
    sum += kill_count['fast'] * 2
    sum += kill_count['tank'] * 4
    sum += kill_count['ranged'] * 2
    sum += kill_count['boss'] * 5
    sum += kill_count['vampire'] * 4
    sum += kill_count['ray'] * 4
    sum += kill_count['scatter'] * 4
    sum *= base_coin[tier-1]
    return int(sum)

def base_cell_gain(kill_count: dict[str, int], tier: int = 1) -> int:
    this_base_cell = base_cell[tier-1]
    sum = kill_count['vampire'] * this_base_cell * 3
    return int(sum)

def total_resource_gain(kill_count: dict[str, int], tier: int = 1) -> dict[str, int] | str:
    if tier < 1 or tier > 18:
        return "Tier Error!"
    theo_coin = base_coin_gain(kill_count, tier)
    theo_cell = base_cell_gain(kill_count, tier)
    return {
        'coin': theo_coin,
        'cell': theo_cell
    }

if __name__ == "__main__":
    from enemy_calculator import total_enemy_calculator
    kill = total_enemy_calculator(10000)
    print(kill)
    print(total_resource_gain(kill))