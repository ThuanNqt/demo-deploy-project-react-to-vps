export const QUERY_KEY = {
  getAllUsers: () => ["fetchUser"],
  getUsersPagination: (page: number) => ["fetchUser", page],
  getAllBlogs: () => ["fetchBlog"],
  getBlogsPagination: (page: number) => ["fetchBlog", page],
};
