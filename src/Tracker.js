import Storage from "./Storage.js";

class CalorieTracker {
	constructor() {
		this._caloriesLimit = Storage.getCalorieLimit();
		this._totalCalories = Storage.getTotalCalories(0);
		this._meals = Storage.getMeals(); //array
		this._workouts = Storage.getWorkouts(); //array

		this._displayCaloriesLimit();
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCaloriesProgress();
	}

	//Public Methods / API
	addMeal(meal) {
		this._meals.push(meal);
		this._totalCalories += meal.calories;
		Storage.setTotalCalories(this._totalCalories);
		Storage.saveMeal(meal);
		this._displayNewMeal(meal);

		this._render();
	}
	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		Storage.setTotalCalories(this._totalCalories);
		Storage.saveWorkout(workout);
		this._displayNewWorkout(workout);

		this._render();
	}

	removeMeal(id) {
		//if findindex does not match it returns -1
		const index = this._meals.findIndex((meal) => meal.id === id);
		//here we check if findindex does not match
		if (index !== -1) {
			const meal = this._meals[index];
			this._totalCalories -= meal.calories;
			Storage.setTotalCalories(this._totalCalories);
			this._meals.splice(index, 1);
			Storage.removeMealFromStorage(id);
			this._render();
		}
	}
	removeWorkout(id) {
		//if findindex does not match it returns -1
		const index = this._workouts.findIndex((workout) => workout.id === id);
		//here we check if findindex does not match
		if (index !== -1) {
			const workout = this._workouts[index];
			this._totalCalories += workout.calories;
			Storage.setTotalCalories(this._totalCalories);
			this._workouts.splice(index, 1);
			Storage.removeWorkoutFromStorage(id);
			this._render();
		}
	}

	reset() {
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];
		Storage.clearAll();
		this._render();
	}

	setLimit(calorieLimit) {
		this._caloriesLimit = calorieLimit;
		Storage.setCalorieLimit(calorieLimit);
		this._displayCaloriesLimit();
		//show calorie limit value in form field
		document.getElementById("limit").value = this._caloriesLimit;
		this._displaySetlimitPlaceholder();
		this._render();
	}

	//To load meals and workout data on the dom
	loadItems() {
		this._meals.forEach((meal) => this._displayNewMeal(meal));
		this._workouts.forEach((workout) => this._displayNewWorkout(workout));
	}

	//Private Methods
	_displayCaloriesTotal() {
		const totalCaloriesEl = document.getElementById("calories-total");
		totalCaloriesEl.innerHTML = this._totalCalories;
	}

	_displayCaloriesLimit() {
		const CaloriesLimitEl = document.getElementById("calories-limit");
		CaloriesLimitEl.innerHTML = this._caloriesLimit;
	}

	_displayCaloriesConsumed() {
		const caloriesConsumedEl = document.getElementById("calories-consumed");

		const consumed = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		);

		//push to DOM
		caloriesConsumedEl.innerHTML = consumed;
	}

	_displayCaloriesBurned() {
		const caloriesBurnedEl = document.getElementById("calories-burned");

		const burned = this._workouts.reduce(
			(total, workout) => total + workout.calories,
			0
		);

		//push to DOM
		caloriesBurnedEl.innerHTML = burned;
	}

	_displayCaloriesRemaining() {
		const caloriesRemainingEl = document.getElementById("calories-remaining");
		const progressEl = document.getElementById("calorie-progress");
		const remaining = this._caloriesLimit - this._totalCalories;

		caloriesRemainingEl.innerHTML = remaining;

		if (remaining <= 0) {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				"bg-light"
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add(
				"bg-danger"
			);
			progressEl.classList.add("bg-danger");
			progressEl.classList.remove("bg-success");
		} else {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				"bg-danger"
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
			progressEl.classList.remove("bg-danger");
			progressEl.classList.add("bg-success");
		}
	}

	_displayCaloriesProgress() {
		const progressEl = document.getElementById("calorie-progress");
		const percentage = (this._totalCalories / this._caloriesLimit) * 100;
		const width = Math.min(percentage, 100);
		progressEl.style.width = `${width}%`;
	}

	_displayNewMeal(meal) {
		const mealsEl = document.getElementById("meal-items");
		const mealEl = document.createElement("div");
		mealEl.classList.add("card", "my-2");
		mealEl.setAttribute("data-id", meal.id);
		mealEl.innerHTML = `
		<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
		`;

		mealsEl.appendChild(mealEl);
	}

	_displayNewWorkout(workout) {
		const workoutsEl = document.getElementById("workout-items");
		const workoutEl = document.createElement("div");
		workoutEl.classList.add("card", "my-2");
		workoutEl.setAttribute("data-id", workout.id);
		workoutEl.innerHTML = `
		<div class="card-body">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="mx-1">${workout.name}</h4>
				<div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">${workout.calories}</div>
				<button class="delete btn btn-danger btn-sm mx-2">
				<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
        </div>
		`;

		workoutsEl.appendChild(workoutEl);
	}

	//Emmanuel added and update this method
	_displaySetlimitPlaceholder() {
		const input = document.getElementById("limit");
		input.setAttribute("placeholder", this._caloriesLimit);
		//console.log(input);
	}

	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCaloriesProgress();
	}
}
// End of class CaloriesTracker

export default CalorieTracker;
