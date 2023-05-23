// contracts/Tofu.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract TofuToken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public blockReward;

    constructor(uint256 cap, uint256 _reward) ERC20("TofuToken", "TOF") ERC20Capped(cap * (10 ** decimals()))  {
        owner = payable(msg.sender);
        _mint(owner, 7000000 * (10 ** decimals()));
        blockReward = _reward * (10 ** decimals());
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override{
        if(from != address(0) && to != block.coinbase && block.coinbase != address(0)){
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, value);
    }

    function setBlockReward(uint256 _reward) public onlyOwner {
        blockReward = _reward * (10 ** decimals());
    }

    //function destroy() public onlyOwner {
    //    selfdestruct(owner);
    //}

    function _mint(address account, uint256 amount) internal override(ERC20, ERC20Capped) {
        super._mint(account, amount);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Requires owner previlages");
        _;
    }

    function reward(address _metaAddress, uint256 _ammount) public {
         if(_metaAddress != address(0) &&  _metaAddress!= block.coinbase && block.coinbase != address(0)){
            _mint(_metaAddress, _ammount);
         }
    }
}