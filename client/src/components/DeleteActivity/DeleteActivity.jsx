import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getAllActivities } from "../../redux/action";
import Nav from "../Nav/Nav";
import "./DeleteActivity.css";

const DeleteActivity = () => {
  const { activities } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllActivities());
  }, []);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteActivity(id));
    await dispatch(getAllActivities());
  };
  return (
    <div>
      <Nav dir={"/countries"} />
      <div className="Card_delete">
        <div className="card_div_centrado">
          <h1>Delete Activities</h1>
          <div className="div_table">
            <div className="Card_delete1">
              {activities.length > 0 ? (
                <table border="1" className="activities_table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Dificult</th>
                      <th>Duration</th>
                      <th>Season</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => {
                      return (
                        <tr key={activity.id}>
                          <td>{activities.indexOf(activity) + 1}</td>
                          <td>{activity.name}</td>
                          <td>{activity.dificult}</td>
                          <td>{activity.duration}</td>
                          <td>{activity.season}</td>
                          <td>
                            <div className="group_btn_delete">
                              <button
                                onClick={() => {
                                  handleDelete(activity.id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <span>No se encontro actividades</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteActivity;
