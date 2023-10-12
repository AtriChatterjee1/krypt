// https://eth-sepolia.g.alchemy.com/v2/dXTrur0D3mcdxd26kUjjhN85FHxaNizr

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.4.11',
  networks : {
    sepolia : {
      url: 'https://eth-sepolia.g.alchemy.com/v2/dXTrur0D3mcdxd26kUjjhN85FHxaNizr' ,
      accounts : [${{secrets.PRIVATE_KEY}}]
    }
  }
}
