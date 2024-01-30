const { User } = require("../Models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { createAcessToken, createRefreshToken } = require("../utils/jwt");

class UserService {
  constructor() {}

  //이메일 전송하기
  async SendEmail(email) {
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dada4202@gmail.com",
        pass: process.env.Google_APP_KEY,
      },
    });

    const authNo = Math.random().toString(36).slice(2);
    const message = {
      from: "dada4202@gmail.com",
      to: email,
      subject: "화사해 인증번호",
      text: authNo,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        const error = new Error(err);
        error.status = 400;
        throw error;
      }
    });
    return authNo;
  }

  //회원가입
  async Singup(userDTO) {
    const { email, name, password, zipcode, address, detailAddress, role } =
      userDTO;

    const isEmailSaved = await User.findOne({ email, deletedAt: null });

    //이미 DB에 이메일이 있다면
    if (isEmailSaved) {
      const error = new Error("이미 등록되어 있는 이메일입니다.");
      error.status = 400;
      throw error;
    }

    //DB에 이메일이 없다면
    const user = new User({
      name,
      email,
      password,
      zipcode,
      address,
      detailAddress,
      role,
    });

    //비밀번호 암호화 하기
    const salt = await bcrypt.genSalt(10); //바이트 단위의 임의의 문자열 salt생성
    user.password = await bcrypt.hash(user.password, salt); //비밀번호 + salt로 암호화된 비밀번호 생성

    const newUser = await user.save(); //새로운 유저 저장

    return {
      id: newUser?._id,
      name: newUser?.name,
      email: newUser?.email,
      zipcode: newUser?.zipcode,
      address: newUser?.address,
      detailAddress: newUser?.detailAddress,
      role: newUser?.role,
    };
  }

  //로그인
  async SignIn(loginInfo) {
    const { email, password } = loginInfo;

    //DB에서 유저정보 찾기
    const user = await User.findOne({ email, deletedAt: null });
    if (!user) {
      const error = new Error("가입된 유저가 아닙니다.");
      error.status = 400;
      throw error;
    }

    //입력한 비밀번호와 DB의 비밀번호 같은지 비교
    const isValidPassword = bcrypt.compare(password, user?.password);

    //만약 유저정보가 없거나 비밀번호가 동일하지 않다면
    if (!isValidPassword) {
      const error = new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
      error.status = 400;
      throw error;
    }

    //로그인 성공 후
    const accessToken = createAcessToken(user);
    const refreshToken = createRefreshToken(user);

    //새로 발급한 refreshToken을 DB 유저 스키마에 저장
    await User.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    return {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      zipcode: user?.zipcode,
      address: user?.address,
      detailAddress: user?.detailAddress,
      role: user?.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  //특정 유저 정보 조회
  async FindById(userInfo) {
    const user = await User.findOne({ _id: userInfo?.id });

    if (!user) {
      const error = new Error("유저 정보가 존재하지 않습니다.");
      error.status = 400;
      throw error;
    }

    return {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      zipcode: user?.zipcode,
      address: user?.address,
      detailAddress: user?.detailAddress,
      role: user?.role,
      order: user?.order,
      product: user?.product,
    };
  }

  //특정 유저 정보 수정
  async UpdateById(userInfo, data) {
    const { email } = userInfo;
    const { name, password, zipcode, address, detailAddress } = data;

    if (!password) {
      const error = new Error("비밀번호 없이 회원을 수정할 수 없습니다.");
      error.status = 400;
      throw error;
    }

    //DB에서 유저정보 찾기
    const user = await User.findOne({ email, deletedAt: null });
    if (!user) {
      const error = new Error("가입된 유저가 아닙니다.");
      error.status = 400;
      throw error;
    }

    //입력한 비밀번호와 DB의 비밀번호 같은지 비교
    const isValidPassword = bcrypt.compare(password, user?.password);

    //만약 유저정보가 없거나 비밀번호가 동일하지 않다면
    if (!isValidPassword) {
      const error = new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
      error.status = 400;
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userInfo?.id,
      {
        name,
        zipcode,
        address,
        detailAddress,
      },
      { new: true } //db 업데이트한 정보 return 받기
    );

    return {
      id: updatedUser?._id,
      name: updatedUser?.name,
      email: updatedUser?.email,
      zipcode: updatedUser?.zipcode,
      address: updatedUser?.address,
      detailAddress: updatedUser?.detailAddress,
      role: updatedUser?.role,
      order: updatedUser?.order,
      product: updatedUser?.product,
    };
  }

  //특정 유저 정보 삭제
  async DeleteById(userInfo, password) {
    const { email } = userInfo;
    //DB에서 유저정보 찾기
    const user = await User.findOne({ email, deletedAt: null });
    if (!user) {
      const error = new Error("가입된 유저가 아닙니다.");
      error.status = 400;
      throw error;
    }

    //입력한 비밀번호와 DB의 비밀번호 같은지 비교
    const isValidPassword = bcrypt.compare(password, user?.password);

    //만약 유저정보가 없거나 비밀번호가 동일하지 않다면
    if (!isValidPassword) {
      const error = new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
      error.status = 400;
      throw error;
    }
    const deletedUser = await User.findByIdAndUpdate(
      userInfo?.id,
      {
        deletedAt: new Date(),
      },
      { new: true } //db 업데이트한 정보 return 받기
    );

    return {
      deletedAt: deletedUser?.deletedAt,
    };
  }

  //모든 유저 정보 불러오기(관리자)
  async FindAll(userInfo, page = 1) {
    if (userInfo?.role !== "관리자") {
      const error = new Error("관리자 권한이 아닙니다.");
      error.status = 403;
      throw error;
    }

    //pagination
    //offset 방식(책갈피 방식) - db의 모든 데이터를 조회할 수도 있음..
    //cursor 방식 ()
    const perPage = 3;
    page = Number(page);

    const [totalCount, users] = await Promise.all([
      User.countDocuments({ deletedAt: null }),
      User.find({ deletedAt: null })
        .sort({ createdAt: -1 }) //Sort by createdAt DESC
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);

    const totalPage = Math.ceil(totalCount / perPage);

    //쿼리스트링으로 접속할 경우 page가 totalPage보다 클 경우 totalPage로 변경
    if (page > totalPage) {
      page = totalPage;
    }

    //유저정보 필터링하기
    const filterdUsers = JSON.parse(JSON.stringify(users)).map((user) => ({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      zipcode: user?.zipcode,
      address: user?.address,
      detailAddress: user?.detailAddress,
      role: user?.role,
      order: user?.order,
      product: user?.product,
    }));

    return {
      users: filterdUsers,
      page,
      perPage,
      totalPage,
      totalCount,
    };
  }
}

module.exports = UserService;
