class RouteConstants {
  static ROOTROUTE = {
    HOME: "/*",
    AUTH: "/auth/*",
    CAREER: "/career/*",
    COURSES: "/courses/*",
    BLOGS: "/blogs/*",
    CREATECOURSES: "/create-courses/*",
    CREATEBLOGS: "/create-blogs/*",
    ADMIN: "/admin/*",
    PREMIUMCOURSES: "/premium-courses",
  };

  static PREMIUMCOURSES = "/premium-courses";
  static NOTFOUND = "*";

  static MAINROUTE = { 
    HOME: "/",
    CONTACTUS: "/contactus",
    SERVICES: "/services",
    USERPROFILE: "/user-profile/*",
    ABOUT: "/about",
    TRAININGTEAM: "/trainingteam",
    PROGRAMS: "/programs",
    INTERNSHIPFORM: "/internship-training-from",
  };

  static AUTHROUTE = {
    LOGIN: "/signin",
    REGISTER: "/signup",
    FORGOTPASSWORD: "/forgot-password",
    RESET: "/reset",
    
  };

  static COURSEROUTE = {
    COURSE: "/course",
    COURSEDETAILS: "/course-details",
    COURSEEDIT: "/course-edit",
    COURSECREATE: "/course-create",
  };

  static BLOGROUTE = {
    BLOG: "/blog",
    SHOWBLOG: "/show-blogs",
    BLOGPAGE: "/blog/:blogId",
    BLOGDETAILS: "/blog-details",
    BLOGEDIT: "/blog-edit",
    BLOGCREATE: "/blog-create",
  };

  static ADMINROUTE = {
    DASHBOARD: "/dashboard",
    USERS: "/users",
    COURSES: "/courses",
    BLOGS: "/blogs",
    CREATECOURSES: "/create-courses",
    CREATEBLOGS: "/create-blogs",
  };

  static CAREERROUTE = {
    JOBS: "/jobs",
    INTERNSHIPS: "/internships",
    JOBDETAILS: "/job-details",
    INTERNSHIPDETAILS: "/internship-details",
    JOBAPPLY: "/job-apply",
    INTERNSHIPAPPLY: "/internship-apply",
  };

  static USERPROFILE = {
    PROFILE: "/profile",
    EDITPROFILE: "/edit-profile",
    CHANGEPASSWORD: "/change-password",
  };

  static NAVIGATING_ROUTE = {
    GOTO_SIGNIN: RouteConstants.ROOTROUTE.AUTH.replace("/*", "") + RouteConstants.AUTHROUTE.LOGIN,
    GOTO_SIGNUP: RouteConstants.ROOTROUTE.AUTH.replace("/*", "") + RouteConstants.AUTHROUTE.REGISTER,
    GOTO_FORGOTPASSWORD: RouteConstants.ROOTROUTE.AUTH.replace("/*", "") + RouteConstants.AUTHROUTE.FORGOTPASSWORD,
    GOTO_HOME: RouteConstants.MAINROUTE.HOME,
    GOTO_COURSES: RouteConstants.ROOTROUTE.COURSES.replace("/*", ""),
    GOTO_BLOGS: RouteConstants.ROOTROUTE.BLOGS.replace("/*", "") + RouteConstants.BLOGROUTE.SHOWBLOG,
    GOTO_CAREER: RouteConstants.ROOTROUTE.CAREER.replace("/*", ""),
    GOTO_ADMIN: RouteConstants.ROOTROUTE.ADMIN.replace("/*", ""),

    // Profile realted 
    GOTO_USERPROFILE: RouteConstants.MAINROUTE.USERPROFILE.replace("/*", ""),
    GOTO_CREATECOURSES: RouteConstants.ROOTROUTE.CREATECOURSES.replace("/*", ""),
    GOTO_CREATEBLOGS: RouteConstants.ROOTROUTE.CREATEBLOGS.replace("/*", ""),
    GOTO_PREMIUMCOURSES: RouteConstants.PREMIUMCOURSES,

  };
}

export default RouteConstants;
