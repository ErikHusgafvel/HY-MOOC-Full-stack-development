interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): ResultObject => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((number) => number > 0).length;
  const average = hours.reduce((sum, value) => sum + value, 0) / periodLength;

  const ratingSuccess: number = average / target;
  let rating: number;
  let ratingDescription: string;

  if (ratingSuccess < 0.5) {
    rating = 1;
    ratingDescription = 'poor performance';
  } else if (ratingSuccess < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'excellent work! you rock!';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
