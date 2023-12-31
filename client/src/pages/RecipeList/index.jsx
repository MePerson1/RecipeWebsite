import RecipeRow from "../RecipeRow";
import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
const RecipeList = ({ recipies, user, setRecipieDetails }) => {
  const [userRecipies, setUserRecipies] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (user) {
      const config = {
        method: "get",
        url: `http://localhost:8080/api/recipes/${user._id}/user`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      axios(config)
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setUserRecipies(data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            console.log("nie dziala!");
            localStorage.removeItem("token");
            window.location.reload();
          }
        });
    }
  }, [user]);
  return (
    <>
      <div className={styles.heading}>
        {user ? <p>Twoje przepisy</p> : <p>Przepisy</p>}
      </div>

      <div className="flex p-3">
        {recipies &&
          !userRecipies &&
          recipies.map((recipe) => {
            if (!recipe.is_private) {
              return (
                <RecipeRow
                  key={recipe._id}
                  value={recipe._id}
                  recipe={recipe}
                  user={user}
                  setRecipieDetails={setRecipieDetails}
                />
              );
            }
          })}
        {!recipies && <p>Brak przepisow!</p>}
      </div>
    </>
  );
};

export default RecipeList;
