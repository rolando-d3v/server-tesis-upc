import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
// import { PrismaClient } from "@prisma/client";
import { var_env } from "../../config_env";
import bcrypt from "bcrypt";

// const prisma = new PrismaClient();


//? AUTH 
//? ***********************************************************************************************/
export const auth = async (req: Request, res: Response) => {
  try {

    const email = req.body.email;
    const password = req.body.password;


    if (!email || !password) {
      return res.status(500).json({ msj: "Campos requeridos Email, Password ❗️" });
    }

    // const existe_email = await prisma.usuario.findFirst(
    //   {
    //     where: {
    //       email_v: email,
    //       estado_b: true
    //     },
    //     select: {
    //       email_v: true,
    //       password_v: true,
    //       uuid_user_u: true
    //     }
    //   }
    // )


    // if (!existe_email) {
    //   return res.status(400).json({ msj: "Error: email no valido ❗️" });
    // }


    // const passCompare = await bcrypt.compare(password, existe_email.password_v);

    // if (!passCompare) {
    //   return res.status(400).json({ msn: "Password Incorrecto ❗️" });
    // }


    // const token = jwt.sign(
    //   { uuid: existe_email.uuid_user_u, ok: true },
    //   var_env.SECRET_TOKEN,
    //   { expiresIn: "5h" }
    // );

    // return res.json({ msj: "Login successfully 😃 ✔️", uuid: existe_email.uuid_user_u, token });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ msj: "Error: server ❗️", err });
  }
};



//? CREATE USER CON AUTH
//? **********************************************************************************************/
export const createUser = async (req: Request, res: Response) => {
  try {

    // const regisLogin = await prisma.usuario.create({
    //   data: {
    //     email_v: req.body.email,
    //     password_v: await bcrypt.hash(req.body.password, 10),
    //     nombre_v: req.body.nombres,
    //     apellido_v: req.body.apellidos,
    //   },
    // });
    // return res.json({ msn: "Registro created success 😃 ✔️", regisLogin });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msn: "Error: server ❗️", err });
  }
};





//? AUTH MANTIENE LOGIN
//? ***********************************************************************************************/
export const postVerifyAuth = async (req: Request, res: Response) => {
  try {
    const existeToken = req.header("Authorization");
  

    if (!existeToken) {
      res
        .status(401)
        .json({ ok: false, message: "Acceso denegado: token requerido" });
    } else {


      const token = existeToken?.startsWith("Bearer ")
        ? existeToken.split(" ")[1]
        : existeToken;


      jwt.verify(token, var_env.SECRET_TOKEN, (err, userToken) => {
        if (err) {
          return res
            .status(500)
            .json({ msj: "Error: Authentication failed! 😕 ❗️❗️" });
        } else {
          return res.json({
            msj: "Login successfully 😃 ✔️",
            user: userToken,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msj: "Error: server 😕 ❗️❗️", err });
  }
};

