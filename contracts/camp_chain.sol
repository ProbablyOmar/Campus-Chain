// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
//
//contract WaterMelon is ERC20 ("WaterMelon", "WMT") {
//    function fund() public {
//        _mint(msg.sender, 50 * 10**18);
//    }
//    function reward(address winner, uint amount) public{
//        _mint(winner, amount);
//    }
//    function getBalance(address user) public view returns(uint256){
//        return balanceOf(user);
//    }
//}
//
contract camp_chain {
//    WaterMelon public tokensContract = new WaterMelon();

    struct Student {
        uint StudID;
        bytes16 name;
        bytes16 email;
        uint points;
        bool category;
        uint[] QuestionsAskedIds;
        uint[] answeredQuestionIds;
        address metamaskAddress;
    }
    
    struct AcademicStaff {
        uint StaffID;
        bytes16 name;
        bytes16 email;
        bytes32 field;
        bool category;
        uint[] verifiedAnswerIds;
        address metamaskAddress;
    }
    struct Question {
        uint questionid;
        string text;
        address asker;
        bool answered;
    }
    
    struct Answer {
        uint answerId;
        string text;
        address answerer;
        bool verified;
    }

    mapping (address => uint[]) public userQuestions;
    mapping (address => Student) public students;
    mapping (address => AcademicStaff) public academicStaff;
    
    // function to add a new student
    function addStudent(uint _id, bytes16  _name, bytes16  _email, address metamaskAddress) public {
        students[msg.sender] = Student(_id, _name, _email, 0, false, new uint[](0), new uint[](0), metamaskAddress);
    }
    
    function addAcademicStaff(uint id, bytes16  name, bytes16  _email, address metamaskAddress) public {
        academicStaffCount++;
        academicStaff[msg.sender] = AcademicStaff(id, name, _email, "Engineering", true, new uint[](0), metamaskAddress);
    }


//    function getBalance(address user) public view returns(uint256){
//        return tokensContract.getBalance(user);
//    }

    // function to add reputation points to a student
    function upvoteA(uint _answer, uint answertime, uint time_now) public {
        uint256 point = 1 - ((time_now - answertime) / (2 * 86400));
        if(academicStaff[msg.sender].category = true && students[msg.sender].category != false){
            point *= 3;
        }
        students[answers[_answer].answerer].points += point;
        // transfer the tokens here if possible (call other function)
//        if(students[answers[_answer].answerer].points > 100){
//            tokensContract.reward(answers[_answer].answerer, 5000);
//            students[answers[_answer].answerer].points -= 100;
//        }
    }
    

    mapping(uint => Question) questions;
    mapping(uint => Answer) answers;
    
    uint studentCount;
    uint academicStaffCount;
    uint questionCount;
    uint answerCount;
    
    event QuestionAsked(uint questionId);
    event AnsweredQuestion(uint questionId, uint answerId);
    event AnswerVerified(uint answerId);
    event TokensRewarded(address recipient, uint amount);
    
    function askQuestion(string memory text) public payable  {
        questionCount++;
        questions[questionCount] = Question(questionCount, text, msg.sender, false);
        userQuestions[msg.sender].push(questionCount);
        emit QuestionAsked(questionCount);
    }

    function getQuestions(uint256 _id) public view returns (Question memory) {
        return questions[_id];
    }
    
    function getUserQuestions() public view returns (uint256[] memory) {
        return userQuestions[msg.sender];
        }
    
    function answerQuestion(uint questionId, string memory text) public {
        require(!questions[questionId].answered, "Question already answered");
        answerCount++;
        answers[answerCount] = Answer(answerCount, text, msg.sender, false);
        questions[questionId].answered = true;
        emit AnsweredQuestion(questionId, answerCount);
    }
}