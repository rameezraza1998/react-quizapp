import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  let [result, setResult] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showFinishAlert, setshowFinishAlert] = useState(false)

  const input = useRef([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("https://the-trivia-api.com/v2/questions");
      const data = await response.json();
      console.log(data);
      setQuestions(data);
      setError(false);
    } catch (error) {
      // console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  const next = () => {
    const SelectedOption = input.current.find((item) => item && item.checked);

    if (!SelectedOption) {
    setShowAlert(true)
      return;
    }
    setShowAlert(false);

    console.log(SelectedOption.value);
    setSelectedAnswer(SelectedOption.value);

    if (SelectedOption.value === questions[currentIndex].correctAnswer) {
      setResult(result + 1);
      console.log(result);

      console.log("Correct answer!");
    }

    if (currentIndex < questions.length - 1) {
      setcurrentIndex(currentIndex + 1);
      setSelectedAnswer("");
      return;
    } else {
      setshowFinishAlert(true)
    }
  };

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

return (
  <>
    <div className="mx-4 my-10 border border-gray-300 shadow-lg rounded-lg p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Quiz App {result}/{questions.length}
      </h1>
      {showAlert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Warning!</p>
          <p>Please select an option before submitting.</p>
        </div>
      )};
       {showFinishAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Congratulations!</p>
          <p>Refresh Page to Attempt Quiz Again</p>
        </div>
      )}
      {loading && <p className="text-2xl text-center text-gray-500">Loading...</p>}
      {error && <p className="text-2xl text-center text-red-500">Error Loading Questions!</p>}
      {!loading && questions.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Q{currentIndex + 1}: {questions[currentIndex].question.text}
          </h2>

          <div className="bg-gray-100 rounded-lg p-4 shadow-inner w-full max-w-md">
            {shuffleArray([
              ...questions[currentIndex].incorrectAnswers,
              questions[currentIndex].correctAnswer,
            ]).map((item, index) => (
              <div key={`option${index}`} className="flex items-center mb-4">
                <input
                  type="radio"
                  name="answer"
                  value={item}
                  id={`option${index}`}
                  ref={(el) => (input.current[index] = el)}
                  className="mr-2 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`option${index}`} className="text-lg text-gray-700">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
      <div className="flex justify-center mt-4">
  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300" onClick={next}>
    Next
  </button>
</div>

    </div>
  </>
);

}

export default App;
