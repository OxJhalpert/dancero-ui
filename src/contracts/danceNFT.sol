// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
contract danceNFT is ERC1155, Ownable, ERC1155Supply {
     constructor() ERC1155("https://raw.githubusercontent.com/GeistDv/pruebaNFT1155/main/{id}.json") {
        _mint(msg.sender, 1 , 10 , "");
        _mint(msg.sender, 2 , 20 , "");

        //1 m
        //2 h
    }

    mapping(address => uint[]) private addressToIds;
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        //adding ids to new owner
        for(uint i=0; i < ids.length; i++)
        {
            remove(ids[i], amounts[i], from);
            if(balanceOf(to, ids[i]) == 0){
                addressToIds[to].push(ids[i]);
            }
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    function remove(uint id, uint amount, address _address) public{
        uint[] storage ownerIds  = addressToIds[_address];
        for(uint i=0; i < ownerIds.length; i++)
        {
            if(ownerIds[i] == id && amount == balanceOf(_address, id)){
                ownerIds[i] = ownerIds[ownerIds.length - 1];
                ownerIds.pop();
            }
        }
    }
    function getAllNFTCodesByAddress(address _address) public view returns(uint[] memory)
    {
        return addressToIds[_address];
    }
}

//0x3CAa1C35E5229EbbAEB70ea471F738a99c02381d