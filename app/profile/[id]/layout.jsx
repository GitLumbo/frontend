export function generateMetadata({ params }) {
  return {
    title: "인하 링크",
  };
}
const UserProfileLayout = ({ children, modal }) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
};
export default UserProfileLayout;
