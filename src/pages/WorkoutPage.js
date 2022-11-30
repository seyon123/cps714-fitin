import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./WorkoutPage.css";

import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";

import LoadingSpinner from "../components/LoadingSpinner";
import RoutineItem from "../components/RoutineItem";
import RoutineWorkoutItem from "../components/RoutineWorkoutItem";
import ExploreWorkouts from "../components/ExploreWorkouts";
import CreateRoutineModal from "../components/Modals/CreateRoutineModal";
import ChangeRoutineModal from "../components/Modals/ChangeRoutineModal";
import StepCounter from "../components/StepCounter";
import SleepTracker from "../components/SleepTracker";
import Footer from "../components/Footer";

function WorkoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
  const [changeRoutineShow, setChangeRoutineShow] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({
    name: "",
    exercises: [],
  });
  const [dayData, setDayData] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(collection(db, `workouts`), (snapshot) => {
      setWorkouts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    setIsLoading(false);
  }, [currentUser.uid]);

  // Set the page title
  useEffect(() => {
    document.title = `Workout Page | FitIn`;
  }, []);

  // Get all user defined routines
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, `users/${currentUser.uid}/routines`),
          orderBy("name")
        ),
        (snapshot) => {
          setRoutines(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
        }
      ),
    [currentUser.uid]
  );

  // Get a list of all the workouts for the current day
  useEffect(() => {
    async function getTodaysRoutine() {
      if (!changeRoutineShow) {
        setIsLoading(true);
      }
      const dateString = moment(date).format("YYYY-MM-DD");
      const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
      const docScheduleSnap = await getDoc(docRef);
      if (docScheduleSnap.exists()) {
        setDayData({
          ...docScheduleSnap.data(),
          id: docScheduleSnap.id,
        });
      } else {
        setDayData(null);
      }
      setIsLoading(false);
    }
    getTodaysRoutine();
  }, [date, currentUser.uid, changeRoutineShow]);

  return (
    <LoadingSpinner isLoading={isLoading}>
      <Container fluid className="mainPage px-4">
        <h1 className="pt-4">My Workouts</h1>
        <hr></hr>

        <div className="row">
          {/* Calendar Widget */}
          <div className="col-lg-3 mb-4">
            <div className="calendarStyle">
              <DayPicker
                required
                numberOfMonths={1}
                pagedNavigation
                mode="single"
                onSelect={setDate}
                selected={date}
              />
            </div>
            <StepCounter date={date} dayData={dayData} />
            <SleepTracker date={date} dayData={dayData} />
          </div>

          {/* Today's Workouts */}
          <div className="col-lg-6 mb-4">
            <Card
              className="currentRoutine"
              bg="dark"
              style={{ maxHeight: "70vh" }}
            >
              <Card.Header className="currentRoutineHead">
                {date?.toDateString()}
              </Card.Header>
              <Card.Title className="m-3 d-flex justify-content-between align-items-center">
                <span className="h3 m-0">
                  {dayData?.name ? dayData.name : "No routine selected 😞"}
                </span>
                {/* Change Routine Button */}
                {dayData?.name && (
                  <span
                    className="d-flex align-items-center justify-content-between"
                    role="button"
                    onClick={() => setChangeRoutineShow(true)}
                  >
                    {" Change Routine"}
                    <MdEdit size="1.2em" className="ms-2" />
                  </span>
                )}
              </Card.Title>

              <Card.Body style={{ overflowY: "auto" }}>
                {/* Select Routine Button */}
                {!dayData?.exercises && (
                  <Card
                    className="workoutItemCard hover-overlay"
                    role="button"
                    onClick={() => setChangeRoutineShow(true)}
                  >
                    <Card.Body className="d-flex align-items-center justify-content-center ">
                      <span className="pe-3">
                        <MdAddCircleOutline size="3em" />
                      </span>
                      <h3 className="text-light mb-0">Select Routine</h3>
                    </Card.Body>
                  </Card>
                )}
                {/* List of Workouts for Day*/}
                {dayData?.exercises?.map(({ id, ref, sets, reps }) => (
                  <RoutineWorkoutItem
                    key={id}
                    id={id}
                    docRef={ref}
                    sets={sets}
                    reps={reps}
                    date={date}
                    dayData={dayData}
                  />
                ))}
              </Card.Body>
            </Card>
          </div>

          {/* My Routines */}
          <div className="col-lg-3 mb-4">
            <Card bg="dark" style={{ maxHeight: "70vh" }}>
              <Card.Header className="myRoutines">My Routines</Card.Header>
              <Card.Body className="pb-2" style={{ overflowY: "auto" }}>
                {/* List of Routines */}
                {routines?.length > 0 &&
                  routines.map(({ id, name, exercises }) => (
                    <RoutineItem
                      key={id}
                      id={id}
                      name={name}
                      exercises={exercises}
                      setModalShow={setModalShow}
                      setCurrentRoutine={setCurrentRoutine}
                    />
                  ))}

                {/* New Routine Button */}
                <Card
                  className="newRoutine"
                  bg="dark"
                  border="white"
                  role="button"
                  onClick={() => setModalShow(true)}
                >
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <Card.Title className="text-light mb-0">
                      Create Routine
                    </Card.Title>
                    <span>
                      <MdAddCircleOutline size="2em" />
                    </span>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Explore Workouts Component */}
        <ExploreWorkouts workouts={workouts} />

        {/* Create Routine Modal */}
        <CreateRoutineModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setModalShow={setModalShow}
          setCurrentRoutine={setCurrentRoutine}
          currentRoutine={currentRoutine}
          workouts={workouts}
        />

        {/* Change Routine Modal */}
        <ChangeRoutineModal
          show={changeRoutineShow}
          onHide={() => setChangeRoutineShow(false)}
          setModalShow={setChangeRoutineShow}
          routines={routines}
          dayData={dayData}
          date={date}
        />
        <Footer />
      </Container>
    </LoadingSpinner>
  );
}

export default WorkoutPage;
