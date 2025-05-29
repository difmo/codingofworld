export const createUserModel = ({ uid, name, email }) => ({
    uid,
    name,
    email,
    whoIs: "isUser",
    isCreatePermission: false,
    isVlogCreatePermission: false,
    isCourseContentCreatePermission: false,
    isCourseWithVideoCreatePermission: false,
    createdAt: new Date(),
  });

// sdfdsfsd
