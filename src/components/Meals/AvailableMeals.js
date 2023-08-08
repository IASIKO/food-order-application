import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(null)

  const fetchMeals = async () => {
    setIsloading(true);
    setIsError(null)
    try {
      const response = await fetch(
        "https://udemy-http-893e6-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      const data = await response.json();

      const mealsData = [];

      for (const key in data) {
        mealsData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(mealsData);
      setIsloading(false);
    } catch (error) {
      setIsError(error.message)
    }
  };

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <p>not found</p>;

  if (meals.length > 0) {
    content = mealsList;
  }

  if (isLoading) {
    content = (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    content = (
      <section className={classes.MealsError}>
        <p>{isError}</p>
      </section>
    );
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
