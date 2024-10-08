use anchor_lang::prelude::*;

#[account]
pub struct StakeConfig {
    pub points_per_stake: u8,
    pub max_stake: u8,
    pub freeze_period: u32,
    pub rewards_bump: u8,
    pub bump: u8,
}

impl Space for StakeConfig {
    const INIT_SPACE: usize = 8  // anchor discriminator
    + 1 * 4  // 4 fields of type u8
    + 4; // u32
}
