var userService = require('./userServices');
//CREAR
var createUserControllerFunc = async (req, res) =>  {
    var result = null;
    try {
        result = await userService.createUserDBService(req.body);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch(err) {
        console.log(err);
    }
}
//LOGIN
var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}
//ENCONTRAR
var findOneUserDBServiceControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.findOneUserDBService (req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg,"firstname": result.firstname});
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}
//ELIMINAR
var deletUseDBServiceControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.deletUseDBService (req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg});
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}
var updateUseDBServiceControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.updateUseDBService (req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg});
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}
var findAllDBServiceControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.findAllUseDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg});
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}


module.exports = {createUserControllerFunc,loginUserControllerFunc,findOneUserDBServiceControllerFunc,deletUseDBServiceControllerFunc,updateUseDBServiceControllerFunc, findAllDBServiceControllerFunc};