export const signUpFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your Name...",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your Email...",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "User password",
    placeholder: "Enter your password...",
    type: "password",
    componentType: "input",
  },
];
export const LoginFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your Email...",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "User password",
    placeholder: "Enter your password...",
    type: "password",
    componentType: "input",
  },
];

export const courseLevelOptions = [
  { id: "beginner", label: "beginner" },
  { id: "intermediate", label: "intermediate" },
  { id: "advance", label: "advance" },
];

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "chinese", label: "Chinese" },
  { id: "japanese", label: "Japanese" },
  { id: "korean", label: "Korean" },
  { id: "portuguese", label: "Portuguese" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
];

export const courseCategories = [
  { id: "web-development", label: "Web Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
];

export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter Course Title...",
    type: "text",
    componentType: "input",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select Course Category...",
    type: "text",
    componentType: "select",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    placeholder: "Select Course Level...",
    type: "text",
    componentType: "select",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    placeholder: "Select Course language...",
    type: "text",
    componentType: "select",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "SubTitle",
    placeholder: "Enter Course SubTitle...",
    type: "text",
    componentType: "input",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter Course Description...",
    type: "text",
    componentType: "input",
  },
  {
    name: "pricing",
    label: "Pricing",
    placeholder: "Enter Course Pricing...",
    type: "text",
    componentType: "input",
  },
  {
    name: "objectives",
    label: "Objectives",
    placeholder: "Enter Course Pricing...",
    type: "text",
    componentType: "input",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    placeholder: "Enter Course Welcome Message...",
    type: "text",
    componentType: "input",
  },
];

export const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  { title: "", video_url: "", public_id: "", freePreview: false },
];

export const signUpInitialFormData = {
  userName: "",
  userEmail: "",
  password: "",
};
export const logiInitialFormData = {
  userEmail: "",
  password: "",
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};
