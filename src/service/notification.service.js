const { emitterInit } = require("../utils/emitter");
const notiModel = require("../models/notification.model");

class NotificationService {
    static sendNotification = async (to, channel, title, content) => {
        try {
        const emitter = await emitterInit();
        for (let merchant_id of to){
            const noti = await notiModel.create({
                title,
                content,
                user_id:merchant_id
            })
            emitter.to(merchant_id).emit(channel, noti)
        }
    } catch (error) {
        console.log(error)
        return {
          status: "Error",
          statusCode: 500,
        };
      }
    }
}

module.exports = NotificationService;
