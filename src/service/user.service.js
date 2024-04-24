const user = require("../models/user.model");
const brcypt = require("bcryptjs");
const instance = require("../config/instance");
const mongoose = require("mongoose");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");
class UserService {
  static getUserData = async (id) => {
    try {
      const userData = await user
        .findById({ _id: new mongoose.Types.ObjectId(id) })
        .select("-password ").exec();

      const getRole = await roleModel.findById(userData.role_id)
      const userResult = {...userData._doc,role: getRole.name }
      return userResult
        ? {
            status: "Success",
            statusCode: 201,
            data: userResult,
          }
        : {
            status: "Not found",
            statusCode: 404,
          };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
  };

  static getHostData = async (filter, options) => {
    try {
      const hostData = await user.paginate(filter, options)

      return hostData
        ? {
            status: "Success",
            statusCode: 201,
            data: hostData,
          }
        : {
            status: "Not found",
            statusCode: 404,
          };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
  };

  static changePassword = async (data, id) => {
    try {
      const checkUser = await user.findById({
        _id: new mongoose.Types.ObjectId(id),
      });
      const compare = await brcypt.compare(data.password, checkUser.password);
      if (compare === false) {
        return {
          status: "Wrong password",
          statusCode: 401,
        };
      }
      if (data.password === data.newPassword)
        return {
          status: "The new password must be different from the old password",
          statusCode: 409,
        };
      // const newHashPassword = await brcypt.hash(data.newPassword, 5);
      const updateUser = await user.findById(new mongoose.Types.ObjectId(id) );

      if (updateUser) {
        updateUser.password = data.newPassword;
        await updateUser.save(); // pre-save hook sẽ được kích hoạt
      }
      return updateUser
        ? {
            status: "Success",
            statusCode: 202,
          }
        : {
            status: "bad request",
            statusCode: 400,
          };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
  };
  static getAllUser = async () => {
    try {
      let allUser = await user.find().select("-password");
      const result = []

      for (let item of allUser) {
        const getRole = await roleModel.findById(item.role_id)
        result.push({
          ...item._doc,
          role: getRole.name,
        })
      }

      return result
        ? {
            status: "Success",
            statusCode: 201,
            data: result,
          }
        : {
            status: "Not found",
            statusCode: 404,
          };
    } catch (error) {
      return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
  };
  static updateUser = async (data, id) => {
    try {
      instance();
      const updateUser = await user
        .findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(id),
          },
          {
            fullName: data.fullName,
            gender: data.gender,
          },
          {
            new: true,
          }
        )
        .select("-password");
      if (!updateUser) {
        return {
          status: "User not existing!",
          statusCOde: 404,
        };
      }
      return {
        status: "Success",
        statusCode: 201,
        data: updateUser,
      };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
    
  };

  static updateHost = async (data, id) => {
    try {
      instance();

      const getRole = await roleModel.findOne({name:'customer'})
      const updateUser = await user
        .findOneAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(id),
            role_id: getRole._id
          },
          {
            status: data.status,
          },
          {
            new: true,
          }
        )
        .select("-password");
      if (!updateUser) {
        return {
          status: "User not existing!",
          statusCode: 404,
        };
      }
      return {
        status: "Success",
        statusCode: 201,
        data: updateUser,
      };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
    
  };

  static createUser = async (userBody) => {
    if (await user.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
      // return {
      //   status: "Error",
      //   statusCode: 400,
      //   EM: "Email already taken",
      // };
    }
    return user.create(userBody);
  };

  static getUserByEmail = async (email) => {
    return user.findOne({ email });
  };
}
module.exports = UserService;
