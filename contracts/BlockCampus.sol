// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    event Transfer (address indexed from, address indexed to, uint256 amount);
}

contract BlockCampus {
    address payable public owner;
    IERC20 public token;

    constructor(address tokenAddress){
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    event Deposit (address from, uint256 amount);
    event Withdraw (address indexed to, uint256 amount);

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
        bool isProf;
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
        uint256[] ratesQ;
        uint256 avgRateQ;
    }
    struct Answer {
        uint256 answerID;
        address owner;
        string body;
        bool verified;
        uint256 voteA;
        uint256 answerDate;
        uint256[] ratesA;
        uint256 avgRateA;
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

    function addStaff (uint _staffID, string memory _name, string memory _email, address _staffMetaAddress, string memory _field, string memory _password, bool _prof) public returns (uint256) {
            academicStaff[msg.sender] = AcademicStaff(_staffID, _name, _email, _field, _staffMetaAddress, 0, true, _prof, _password);
            balance[msg.sender] = msg.sender.balance;
            staffNum++;
            return staffNum;
    }

    function addQuestion(string memory _title, string memory _body) public {
        questionCount++;
        uint256[] memory tempAns;
        uint256[] memory tempRate;
        questions[questionCount] = Question (questionCount, msg.sender, _title, _body, false, tempAns, 0, block.timestamp, tempRate, 0);
        if(academicStaff[questions[questionCount].asker].isVal){
            staffQuestions[msg.sender].push(questionCount);
        } else{
            studentQuestions[msg.sender].push(questionCount);
        }
    }

    function addAnswer(string memory _body, uint256 _questionID) public {
      answerID++;
      uint256[] memory tempRate;
      answers[answerID] = Answer (answerID, msg.sender, _body, false, 0, block.timestamp, tempRate, 0);
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
       if (_p == 0){
         questions[_questionID].voteQ -= 1;
       }
       else {
        questions[_questionID].voteQ += 1;
       }
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
        balance[questions[_questionID].asker] = questions[_questionID].asker.balance;       
    }

    function voteA(uint256 _answerID, uint _p) public{
        if (_p == 0){
            answers[_answerID].voteA -= 1;
        }
        else {
            answers[_answerID].voteA += 1;
        }
        uint256 points = _p * (1 - ((block.timestamp - answers[_answerID].answerDate) / (30 * 86400)));
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
        balance[answers[_answerID].owner] = answers[_answerID].owner.balance;
    }  

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    function reward(address to, uint256 _amount) public{
        _amount *= (10 ** 18);
        require(to != address(0), "Request must be made from a valid account");
        require(token.balanceOf(address(this)) >= _amount , "Insufficient funds for the contract");
        token.transfer(to, _amount);
        balance[to] += _amount;
    }

    receive() external payable{
        emit Deposit(msg.sender, msg.value);
    }

    function getbalance() external view returns (uint256){
        return token.balanceOf(address(this));
    }

    function withdraw() external onlyOwner{
        token.transfer(msg.sender, token.balanceOf(address(this)));
        emit Withdraw(msg.sender, token.balanceOf(address(this)));
    }

    function setPoints(address _student, uint256 _points) public onlyOwner{
        students[_student].points = _points;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Requires owner previlages");
        _;
    }

    function rateQ(uint256 questionID, uint rating) public {
        require(academicStaff[msg.sender].isVal);
        questions[questionID].ratesQ.push(rating);
        uint256 totalRate = 0;
        for (uint i = 0; i < questions[questionID].ratesQ.length; i++){
           totalRate += questions[questionID].ratesQ[i]; 
        }
        questions[questionID].avgRateQ = totalRate / questions[questionID].ratesQ.length;
    }

    function rateA(uint256 _answerID, uint _rating) public {
        require(academicStaff[msg.sender].isVal);
        answers[_answerID].ratesA.push(_rating);
        uint256 totalRate = 0;
        for (uint i = 0; i < answers[_answerID].ratesA.length; i++){
           totalRate += answers[_answerID].ratesA[i]; 
        }
        answers[_answerID].avgRateA = totalRate / answers[_answerID].ratesA.length;
    }
 }