export const metadata = {
  title: "Blog | Blogify",
};

export default function BlogLayout({ children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
