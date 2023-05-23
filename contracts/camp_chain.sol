// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './TofuToken.sol';

contract camp_chain {
    address payable public owner;
    TofuToken private tofu;
    
    constructor(){
        owner = payable(msg.sender);
        tofu = TofuToken(0xE596e16b19CE685E6fC0A9E2291E66fD1FDa3819);
    }

    uint256 public studentsNum = 0;
    uint256 public staffNum = 0;
    uint256 public questionCount = 0;
    uint256 public answerID = 0;

    struct Student{
        uint256 studID;
        string username;
        uint256 year;
        string email;
        address metaAddress;
        string department;
        uint256 points;
        string password;
    }
    struct AcademicStaff {
        uint256 staffID;
        string name;
        string email;
        string field;
        address staffMetaAddress;
        uint points;
        bool isVal;
        string password;

    }
    struct Question {
        uint256 questionID;
        address asker;
        string title;
        string body;
        bool answered;
        uint256[] answers;
        uint256 voteQ;
        uint256 questionDate;
    }
    struct Answer {
        uint256 answerID;
        address owner;
        string body;
        bool verified;
        uint256 voteA;
        uint256 answerDate;
    }
    mapping (address => AcademicStaff) public academicStaff;
    mapping (address => Student) public students;
    mapping (uint256 => Question) public questions;
    mapping (uint256 => Answer) public answers;
    mapping (address => uint256[]) public studentQuestions;
    mapping (address => uint256[]) public studentAnswers;
    mapping (address => uint256[]) public staffQuestions;
    mapping (address => uint256[]) public staffAnswers;
    mapping (address => uint256) public balance;

    function addStudent(uint256 _studID, string memory _username, uint _year, string memory _email, address _metaAddress, string memory _department, uint256 _points, string memory _pass) public returns (uint256) {        
        students[msg.sender] = Student (_studID, _username, _year, _email, _metaAddress, _department, _points, _pass);
        studentsNum++;
        return studentsNum;
    }

    function addStaff (uint _staffID, string memory _name, string memory _email, address _staffMetaAddress, string memory _field) public returns (uint256) {
        AcademicStaff storage staff = academicStaff[_staffMetaAddress];

        staff.staffID = _staffID;
        staff.name = _name;
        staff.email = _email;
        staff.staffMetaAddress = _staffMetaAddress;
        staff.field = _field;
        staffNum++;
        staff.isVal = true;
        return staffNum;
    }

    function addQuestion(string memory _title, string memory _body) public {
        questionCount++;
        questions[questionCount] = Question (questionCount, msg.sender, _title, _body, false, new uint256[] (0) , 0, block.timestamp);
        if(academicStaff[questions[questionCount].asker].isVal){
            staffQuestions[msg.sender].push(questionCount);
        } else{
            studentQuestions[msg.sender].push(questionCount);
        }
    }

    function addAnswer(string memory _body, uint256 _questionID) public {
        answerID++;
      answers[answerID] = Answer (answerID, msg.sender, _body, false, 0, block.timestamp);
      if(academicStaff[answers[answerID].owner].isVal){
            staffAnswers[msg.sender].push(answerID);
        } else{
            studentAnswers[msg.sender].push(answerID);
        }
      questions[_questionID].answers.push(answerID);
    }

    function getQuestion(uint256 _id) public view returns (Question memory) {
        return questions[_id];
    }

    function getCount() public view returns (uint256){
        return questionCount;
    }

    function getUserQuestion(address _metaAddress) public view returns (Question[] memory){
        uint[] memory studentQuest = studentQuestions[_metaAddress];
        Question[] memory questArray = new Question[](studentQuest.length);

        for (uint i = 0; i < studentQuest.length; i++){
            questArray[i] = questions[studentQuest[i]];
        }
        return questArray;
    }

    function getAnswer(uint256 _id) public view returns (Answer memory){
        return answers[_id];
    }
    
    function voteQ(uint256 _questionID, uint _p) public {
       questions[_questionID].voteQ += _p;
       uint256 points = _p * (1 - ((block.timestamp - questions[_questionID].questionDate) / (30 * 86400)));
       if(academicStaff[msg.sender].isVal){
           points *= 3;
       }
       // Add points to Academic staff or student
       if(academicStaff[questions[_questionID].asker].isVal){
           academicStaff[questions[_questionID].asker].points += points;
       } else {
           students[questions[_questionID].asker].points += points;
       }

       if(points >= 100 && points < 200){
            reward(questions[_questionID].asker, 10);
           } else if(points >= 500 && points < 1000){
            reward(questions[_questionID].asker, 50);
           }else if(points >= 1000 && points < 1500){
            reward(questions[_questionID].asker, 100);
           }
    }

    function voteA(uint256 _answerID, uint _p) public{
        answers[_answerID].voteA += _p;
        uint256 points = _p * (1 - ((block.timestamp - answers[_answerID].answerDate) / (30 * 86400)));
        answers[_answerID].voteA++;

        if(academicStaff[msg.sender].isVal){
            points = 3;
        }
        if(academicStaff[answers[_answerID].owner].isVal){
              academicStaff[answers[_answerID].owner].points += points;
        } else {
            students[answers[_answerID].owner].points += points;
        }  
        if(points >= 100 && points < 200){
            reward(answers[_answerID].owner, 10);
           } else if(points >= 500 && points < 1000){
            reward(answers[_answerID].owner, 50);
           }else if(points >= 1000 && points < 1500){
            reward(answers[_answerID].owner, 100);
           }
    }

    function reward(address _MetaAddress, uint256 _ammount) public{
        tofu.reward(_MetaAddress, _ammount);
    }

    //function destroy() public onlyOwner {
    //    selfdestruct(owner);
    //}

    modifier onlyOwner {
        require(msg.sender == owner, "Requires owner previlages");
        _;
    }
 }