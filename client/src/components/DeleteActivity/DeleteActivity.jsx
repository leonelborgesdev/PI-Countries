import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { deleteActivity, getAllActivities } from "../../redux/action";
import Nav from "../Nav/Nav";
import "./DeleteActivity.css";

const DeleteActivity = ({ activities, getAllActivities, deleteActivity }) => {
  useEffect(() => {
    getAllActivities();
  }, []);
  const handleDelete = (id) => {
    // alert(id);
    deleteActivity(id);
    window.location.reload();
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
export const mapStateToProps = (state) => {
  return {
    activities: state.activities,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    getAllActivities: () => dispatch(getAllActivities()),
    deleteActivity: (id) => dispatch(deleteActivity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteActivity);
