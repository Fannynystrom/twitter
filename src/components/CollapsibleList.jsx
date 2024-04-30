import React, { useState } from "react";
import FollowButton from "./FollowButton";
import styles from "./CollapsibleList.module.css"; // Se till att rätt sökväg används

const CollapsibleList = ({ title, users, isOwner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const headerClass = isOpen
    ? `${styles.header} ${styles.open}`
    : styles.header;

  return (
    <div>
      <h3 className={headerClass} onClick={toggleList}>
        {title}: ({users.length})
      </h3>
      {isOpen && (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user._id}>
                {user.username}
                {isOwner && (
                  <FollowButton
                    key={user._id}
                    userId={user._id}
                    action={
                      title.includes("följare") ? "removeFollower" : "unfollow"
                    }
                    className={styles.followingBtnFeed}
                  />
                )}
              </li>
            ))
          ) : (
            <li>Inga användare att visa</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CollapsibleList;

// import React, { useState } from "react";
// import FollowButton from "./FollowButton";
// import btnstyles from "./FollowButton.module.css";
// import styles from "./CollapsibleList.module.css";

// const CollapsibleList = ({ username, users, isOwner }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleList = () => {
//     setIsOpen(!isOpen);
//   };

//   const headerClass = isOpen
//     ? `${styles.header} ${styles.open}`
//     : styles.header;
//   return (
//     <div>
//       <h3 className={headerClass} onClick={toggleList}>
//         {username} följer: {users.length}
//       </h3>
//       {isOpen && (
//         <ul>
//           {users.map((user) => (
//             <li key={user._id}>
//               {user.username}
//               {isOwner && (
//                 <FollowButton
//                   userId={user._id}
//                   className={btnstyles.followingBtnFeed}
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CollapsibleList;
