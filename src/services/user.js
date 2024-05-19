const User = require("../models/user");

//User methods
async function getUsers(){
    const users = await User.find({});
    return users;
};

async function getUser(id){
    console.log(`user Id: ${id}`);
    const user = await User.findOne({_id: id}).select('_id name email role account');
    console.log(user);
    return user;
};


//movement methods
async function createMovement(movementData){
    const { userId, movementType, amount, timestamp, loggedUserId } = movementData;
    let loggedUserData = "system";

    if(!userId || !movementType || !amount ) {
        throw new Error("The information of the movement is incomplete");
    }

    if(movementType !=="d" && movementType !=="w"){
        throw new Error("The specified movement type is not valid")
    }
    const user = await User.findOne({_id:userId});
    if(!user){
        throw new Error("the specified user was not found.");
    }

    if(userId === loggedUserId){
        loggedUserData = user.email;
    }
    else if(loggedUserId)
    {
        const loggedUser = await User.findOne({_id:loggedUserId});
        if(!loggedUser){
            throw new Error("the logged user was not found.");
        }
        loggedUserData = loggedUser.email;
    }
    

    
    try{
        let newMovement = {
            movementType: movementType,
            amount: Number(amount).toFixed(2),
            timestamp: timestamp?timestamp:Date.now(),
            loggedUser: loggedUserData
        }
        user.account.movements.push(newMovement);
        console.log(user.account.movements);
        const sum_deposit = user.account.movements.filter(m=>m.movementType==='d').reduce((accumulator, current)=> accumulator + Number(current.amount),0);
        const sum_withdraw = user.account.movements.filter(m=>m.movementType==='w').reduce((accumulator, current)=> accumulator + Number(current.amount),0);
        const sum = sum_deposit - sum_withdraw;
        //user.account.balance = Number(user.account.balance) + ((movementType === 'w')? -amount : Number(amount).toFixed(2)); 
        console.log("sum_deposit",sum_deposit);
        console.log("sum_withdraw",sum_withdraw);
        console.log(sum);
        user.account.balance = sum;
        
        const result = await user.save();
        return result;
    }catch(err){
        throw new Error(err);
    }
}

module.exports = { 
    getUsers,
    getUser,
    createMovement
}