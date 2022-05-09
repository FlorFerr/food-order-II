import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const fetchMeals = async () => {
    const response = await fetch('https://foodorder-665d5-default-rtdb.firebaseio.com/Meals.json')
    
    
    if(!response.ok){
      throw new Error ('Something went wrong')
    }
    const responseData = await response.json()



    const loadedMeals = []

    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
      })}
    
      setMeals(loadedMeals)
      setIsLoading(false)
    
    
    }
    
      fetchMeals().catch(error => {
        setIsLoading(false)
        setError(error)
        console.log(error)
      })
    
    
    
    

  },[])

  if(isLoading){
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(error){
    return(
      <section>
        <p>{error}</p>
      </section>
    )
  }
  

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

 

  return (
    <section className={classes.meals}>
      
      <Card>
      <ul>{mealsList}</ul>
    </Card>
    </section>
  );
};

export default AvailableMeals;
