let ret;

// 创建假数据
function getDemoProject() {
  //console.debug("getDemoProject")
  ret = {
    tasks: [
      {
        id: -1,
        name: "Gantt editor",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "任务1",
        level: 0,
        status: "STATUS_ACTIVE",
        depends: "",
        canWrite: true,
        start: 1396994400000,
        duration: 20,
        end: 1399586399999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: true
      },
      {
        id: -2,
        name: "coding",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "",
        level: 1,
        status: "STATUS_ACTIVE",
        depends: "",
        canWrite: true,
        start: 1396994400000,
        duration: 10,
        end: 1398203999999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: true
      },
      {
        id: -3,
        name: "gantt part",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "",
        level: 2,
        status: "STATUS_ACTIVE",
        depends: "",
        canWrite: true,
        start: 1396994400000,
        duration: 2,
        end: 1397167199999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: false
      },
      {
        id: -4,
        name: "editor part",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "",
        level: 2,
        status: "STATUS_SUSPENDED",
        depends: "3",
        canWrite: true,
        start: 1397167200000,
        duration: 4,
        end: 1397685599999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: false
      },
      {
        id: -5,
        name: "testing",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "",
        level: 1,
        status: "STATUS_SUSPENDED",
        depends: "2:5",
        canWrite: true,
        start: 1398981600000,
        duration: 5,
        end: 1399586399999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: true
      },
      {
        id: -6,
        name: "test on safari",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "",
        level: 2,
        status: "STATUS_SUSPENDED",
        depends: "",
        canWrite: true,
        start: 1398981600000,
        duration: 2,
        end: 1399327199999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: false
      },
      {
        id: -7,
        name: "test on ie",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "",
        level: 2,
        status: "STATUS_SUSPENDED",
        depends: "6",
        canWrite: true,
        start: 1399327200000,
        duration: 3,
        end: 1399586399999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: false
      },
      {
        id: -8,
        name: "test on chrome",
        progress: 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: "",
        code: "",
        level: 2,
        status: "STATUS_SUSPENDED",
        depends: "6",
        canWrite: true,
        start: 1399327200000,
        duration: 2,
        end: 1399499999999,
        startIsMilestone: false,
        endIsMilestone: false,
        collapsed: false,
        assigs: [],
        hasChild: false
      }
    ],
    selectedRow: 2,
    deletedTaskIds: [],
    resources: [
      { id: "tmp_1", name: "Resource 1" },
      { id: "tmp_2", name: "Resource 2" },
      { id: "tmp_3", name: "Resource 3" },
      { id: "tmp_4", name: "Resource 4" }
    ],
    roles: [
      { id: "tmp_1", name: "Project Manager" },
      { id: "tmp_2", name: "Worker" },
      { id: "tmp_3", name: "Stakeholder" },
      { id: "tmp_4", name: "Customer" }
    ],
    canWrite: true,
    canDelete: true,
    canWriteOnParent: true,
    canAdd: true
  };

  //actualize data
  var offset = new Date().getTime() - ret.tasks[0].start;
  for (var i = 0; i < ret.tasks.length; i++) {
    ret.tasks[i].start = ret.tasks[i].start + offset;
  }
  return ret;
}

// 模拟从服务器加载数据
function loadGanttFromServer(taskId, callback) {
  var ret = loadFromLocalStorage();
  return ret;
}

// 模拟存储数据到服务器
function saveGanttOnServer() {
  saveInLocalStorage();
}

// 新建项目
function newProject() {
  clearGantt();
}

// 清空数据
function clearGantt() {
  ge.reset();
}

// 从localStorage加载数据
function loadFromLocalStorage() {
  var ret;
  if (localStorage) {
    if (localStorage.getObject("teamworkGantDemo")) {
      ret = localStorage.getObject("teamworkGantDemo");
    }
  }
  if (!ret || !ret.tasks || ret.tasks.length == 0) {
    ret = getDemoProject();
  }
  return ret;
}

// 将数据保存到localStorage
function saveInLocalStorage() {
  var prj = ge.saveProject();
  if (localStorage) {
    localStorage.setObject("teamworkGantDemo", prj);
  }
}

//-------------------------------------------  Open a black popup for managing resources. This is only an axample of implementation (usually resources come from server) ------------------------------------------------------
function editResources() {
  //make resource editor
  var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
  var resTbl = resourceEditor.find("#resourcesTable");

  for (var i = 0; i < ge.resources.length; i++) {
    var res = ge.resources[i];
    resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"));
  }

  //bind add resource
  resourceEditor.find("#addResource").click(function() {
    resTbl.append(
      $.JST.createFromTemplate({ id: "new", name: "resource" }, "RESOURCE_ROW")
    );
  });

  //bind save event
  resourceEditor.find("#resSaveButton").click(function() {
    var newRes = [];
    //find for deleted res
    for (var i = 0; i < ge.resources.length; i++) {
      var res = ge.resources[i];
      var row = resourceEditor.find("[resId=" + res.id + "]");
      if (row.length > 0) {
        //if still there save it
        var name = row.find("input[name]").val();
        if (name && name != "") res.name = name;
        newRes.push(res);
      } else {
        //remove assignments
        for (var j = 0; j < ge.tasks.length; j++) {
          var task = ge.tasks[j];
          var newAss = [];
          for (var k = 0; k < task.assigs.length; k++) {
            var ass = task.assigs[k];
            if (ass.resourceId != res.id) newAss.push(ass);
          }
          task.assigs = newAss;
        }
      }
    }

    //loop on new rows
    var cnt = 0;
    resourceEditor.find("[resId=new]").each(function() {
      cnt++;
      var row = $(this);
      var name = row.find("input[name]").val();
      if (name && name != "")
        newRes.push(
          new Resource("tmp_" + new Date().getTime() + "_" + cnt, name)
        );
    });

    ge.resources = newRes;

    closeBlackPopup();
    ge.redraw();
  });

  var ndo = createModalPopup(400, 500).append(resourceEditor);
}

$.JST.loadDecorator("RESOURCE_ROW", function(resTr, res) {
  resTr.find(".delRes").click(function() {
    $(this)
      .closest("tr")
      .remove();
  });
});

$.JST.loadDecorator("ASSIGNMENT_ROW", function(assigTr, taskAssig) {
  var resEl = assigTr.find("[name=resourceId]");
  var opt = $("<option>");
  resEl.append(opt);
  for (var i = 0; i < taskAssig.task.master.resources.length; i++) {
    var res = taskAssig.task.master.resources[i];
    opt = $("<option>");
    opt.val(res.id).html(res.name);
    if (taskAssig.assig.resourceId == res.id)
      opt.attr("selected", "true");
    resEl.append(opt);
  }
  var roleEl = assigTr.find("[name=roleId]");
  for (var i = 0; i < taskAssig.task.master.roles.length; i++) {
    var role = taskAssig.task.master.roles[i];
    var optr = $("<option>");
    optr.val(role.id).html(role.name);
    if (taskAssig.assig.roleId == role.id) optr.attr("selected", "true");
    roleEl.append(optr);
  }

  if (
    taskAssig.task.master.permissions.canWrite &&
    taskAssig.task.canWrite
  ) {
    assigTr.find(".delAssig").click(function() {
      var tr = $(this)
        .closest("[assId]")
        .fadeOut(200, function() {
          $(this).remove();
        });
    });
  }
});

function loadI18n() {
  GanttMaster.messages = {
    CANNOT_WRITE: "No permission to change the following task:",
    CHANGE_OUT_OF_SCOPE:
      "Project update not possible as you lack rights for updating a parent project.",
    START_IS_MILESTONE: "Start date is a milestone.",
    END_IS_MILESTONE: "End date is a milestone.",
    TASK_HAS_CONSTRAINTS: "Task has constraints.",
    GANTT_ERROR_DEPENDS_ON_OPEN_TASK:
      "Error: there is a dependency on an open task.",
    GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK:
      "Error: due to a descendant of a closed task.",
    TASK_HAS_EXTERNAL_DEPS: "This task has external dependencies.",
    GANNT_ERROR_LOADING_DATA_TASK_REMOVED:
      "GANNT_ERROR_LOADING_DATA_TASK_REMOVED",
    CIRCULAR_REFERENCE: "Circular reference.",
    CANNOT_DEPENDS_ON_ANCESTORS: "Cannot depend on ancestors.",
    INVALID_DATE_FORMAT:
      "The data inserted are invalid for the field format.",
    GANTT_ERROR_LOADING_DATA_TASK_REMOVED:
      "An error has occurred while loading the data. A task has been trashed.",
    CANNOT_CLOSE_TASK_IF_OPEN_ISSUE:
      "Cannot close a task with open issues",
    TASK_MOVE_INCONSISTENT_LEVEL:
      "You cannot exchange tasks of different depth.",
    CANNOT_MOVE_TASK: "CANNOT_MOVE_TASK",
    PLEASE_SAVE_PROJECT: "PLEASE_SAVE_PROJECT",
    GANTT_SEMESTER: "Semester",
    GANTT_SEMESTER_SHORT: "s.",
    GANTT_QUARTER: "Quarter",
    GANTT_QUARTER_SHORT: "q.",
    GANTT_WEEK: "Week",
    GANTT_WEEK_SHORT: "w."
  };
}