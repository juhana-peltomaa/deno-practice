import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectService from "../services/projectService.js";
import * as issueService from "../services/issueService.js";
import * as requestUtils from "../utils/requestUtils.js";


const addProject = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);
  const name = params.get("name");

  await projectService.create(name);
  await requestUtils.redirectTo(request, "/projects")
};

const viewProjects = async (request) => {
  const data = {
    projects: await projectService.findAllProjects(),
    message: "",
  };

  request.respond({ body: await renderFile("projects.eta", data) });
};


const viewProject = async (request) => {
  const urlParts = request.url.split("/");

  const data = {
    project: await projectService.findById(urlParts[2]),
    issues: await issueService.findAllIssues(urlParts[2]),
  };

  request.respond({ body: await renderFile("project.eta", data) });
};

const deleteProject = async (request) => {
    const urlParts = request.url.split("/");
    const deleted = await projectService.deleteProject(urlParts[2])

    await requestUtils.redirectTo(request, "/projects")
    
    if (deleted === true) {
        const data = {
            projects: await projectService.findAllProjects(),
            message: "Project successfully deleted!"
          };
          request.respond({ body: await renderFile("projects.eta", data) });

        } else {
            const data = {
                projects: await projectService.findAllProjects(),
                message: "Project cannot be deleted until all issues are resolved!"
            };
            request.respond({ body: await renderFile("projects.eta", data) });
        }
};

export { addProject, viewProjects, viewProject, deleteProject };