import { executeQuery } from "../database/database.js";


const create = async (name) => {
  await executeQuery("INSERT INTO projects (name) VALUES ($1);", name);
};

const findAllProjects = async () => {
  let result = await executeQuery(
    "SELECT * FROM projects;",
  );
  return result.rows;
};

const findById = async (id) => {
    let result = await executeQuery("SELECT * FROM projects WHERE id = $1;",
    id,
    );

    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
      }

    return { id: 0, description: "Unknown" };
}

const deleteProject = async (id) => {
    let result = await executeQuery("DELETE FROM projects WHERE id = $1 RETURNING *;", 
    id);

    if (result.rows && result.rows.length > 0) {
        return true;
      } 
    return false;
};


export { create, findAllProjects, findById, deleteProject };