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
    INTERNSHIPFORM: "/internshipform",
  };

  static AUTHROUTE = {
    LOGIN: "/login",
    REGISTER: "/register",
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
    GOTO_SIGNIN: this.ROOTROUTE.AUTH + this.AUTHROUTE.LOGIN, // /auth/login
    GOTO_SIGNUP: this.ROOTROUTE.AUTH + this.AUTHROUTE.REGISTER, // /auth/register
    GOTO_FORGOTPASSWORD: this.ROOTROUTE.AUTH + this.AUTHROUTE.FORGOTPASSWORD, // /auth/forgot-password
    GOTO_HOME: this.ROOTROUTE.HOME, // /
    GOTO_COURSES: this.ROOTROUTE.COURSES, // /courses
    // blogs route
    GOTO_BLOGS: "/blogs/show-blogs",

    // carrer
    GOTO_CAREER: this.ROOTROUTE.CAREER,
    GOTO_ADMIN: this.ROOTROUTE.ADMIN,
    GOTO_USERPROFILE: this.ROOTROUTE.USERPROFILE,
    GOTO_CREATECOURSES: '/create-courses/',
    GOTO_CREATEBLOGS: this.ROOTROUTE.CREATEBLOGS,
    GOTO_PREMIUMCOURSES: this.PREMIUMCOURSES,
  };
}

export default RouteConstants;
