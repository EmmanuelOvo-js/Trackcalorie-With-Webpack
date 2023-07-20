//Local Storage class
class Storage {
	//get and set calorie limit data to storage
	static getCalorieLimit(defaultLimit = 2000) {
		let calorieLimit;
		if (localStorage.getItem("calorieLimit") === null) {
			calorieLimit = defaultLimit;
		} else {
			calorieLimit = +localStorage.getItem("calorieLimit");
		}

		return calorieLimit;
	}

	static setCalorieLimit(calorieLimit) {
		localStorage.setItem("calorieLimit", calorieLimit);
	}

	//get and set total calories data to storage
	static getTotalCalories(defaultTotalCalories) {
		let totalCalorie;
		if (localStorage.getItem("totalCalories") === null) {
			totalCalorie = defaultTotalCalories;
		} else {
			totalCalorie = +localStorage.getItem("totalCalories");
		}

		return totalCalorie;
	}
	static setTotalCalories(totalCalories) {
		localStorage.setItem("totalCalories", totalCalories);
	}

	//To save meals form data to local storage
	static getMeals() {
		let meals;
		if (localStorage.getItem("meals") === null) {
			meals = [];
		} else {
			meals = JSON.parse(localStorage.getItem("meals"));
		}

		return meals;
	}

	static saveMeal(meal) {
		const meals = Storage.getMeals();
		meals.push(meal);
		localStorage.setItem("meals", JSON.stringify(meals));
	}

	//To save workouts form data to local storage
	static getWorkouts() {
		let workouts;
		if (localStorage.getItem("workouts") === null) {
			workouts = [];
		} else {
			workouts = JSON.parse(localStorage.getItem("workouts"));
		}

		return workouts;
	}

	static saveWorkout(workout) {
		const workouts = Storage.getWorkouts();
		workouts.push(workout);
		localStorage.setItem("workouts", JSON.stringify(workouts));
	}

	//Remove meals array data from local storage when one clicks on the delete icon
	static removeMealFromStorage(id) {
		const meals = Storage.getMeals();
		meals.forEach((meal, index) => {
			if (meal.id === id) {
				meals.splice(index, 1);
			}
		});
		//Then set meals array to the current array that was deleted from
		localStorage.setItem("meals", JSON.stringify(meals));
	}

	//Remove Workouts array data from local storage when one clicks on the delete icon
	static removeWorkoutFromStorage(id) {
		const workouts = Storage.getWorkouts();
		workouts.forEach((workout, index) => {
			if (workout.id === id) {
				workouts.splice(index, 1);
			}
		});
		//Then set workouts array to the current array that was deleted from
		localStorage.setItem("workouts", JSON.stringify(workouts));
	}
	static clearAll() {
		localStorage.removeItem("totalCalories");
		localStorage.removeItem("workouts");
		localStorage.removeItem("meals");

		//To clear all from storage
		//localStorage.clear();
	}
}
// End of Storage class

export default Storage;