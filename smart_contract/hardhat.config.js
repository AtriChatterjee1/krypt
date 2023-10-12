// https://eth-sepolia.g.alchemy.com/v2/dXTrur0D3mcdxd26kUjjhN85FHxaNizr

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.4.11',
  networks : {
    sepolia : {
      url: 'https://eth-sepolia.g.alchemy.com/v2/dXTrur0D3mcdxd26kUjjhN85FHxaNizr' ,
      accounts : ['38789e9b13d48fd2e727f75d89158ae43e8695f6f00e2e2601594e03dbc0e40e']
    }
  }
}
