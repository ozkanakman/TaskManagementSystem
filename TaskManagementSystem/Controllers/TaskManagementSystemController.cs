using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Interfaces;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskManagementSystemController : ControllerBase
    {
        private readonly ITaskManagementSystem _context;

        public TaskManagementSystemController(ITaskManagementSystem context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetTaskList")]
        public IEnumerable<Models.Task> GetTaskList()
        {
            return _context.GetTaskList();
        }

        [HttpGet]
        [Route("GetUserList")]
        public IEnumerable<Models.User> GetUserList()
        {
            return _context.GetUserList();
        }

        [HttpGet]
        [Route("GetTask/{id}")]
        public Models.Task GetTaskData(int id)
        {
            return _context.GetTaskData(id);
        }

        [HttpPost]
        [Route("AddTask")]
        public IActionResult AddTask(Models.Task task)
        {
            _context.AddTask(task);
            return Ok();
        }

        [HttpPut]
        [Route("UpdateTask")]
        public IActionResult UpdateTask(Models.Task task)
        {
            _context.UpdateTask(task);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteTask/{id}")]
        public IActionResult DeleteTask(int id)
        {
            _context.DeleteTask(id);
            return Ok();
        }

        [HttpGet]
        [Route("GetCommentList/{taskId}")]
        public ActionResult<IEnumerable<Models.Comment>> GetCommentList(int taskId)
        {
            IEnumerable<Comment> comments = _context.GetCommentList(taskId);
            if (comments == null)
            {
                return NotFound();
            }
            return comments.ToList();
        }

        [HttpGet]
        [Route("GetComment/{id}")]
        public ActionResult<Models.Comment> GetCommentData(int id)
        {
            var comment = _context.GetCommentData(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        [HttpPost]
        [Route("AddComment")]
        public IActionResult AddComment(Models.Comment comment)
        {
            _context.AddComment(comment);
            return Ok();
        }

        [HttpPut]
        [Route("UpdateComment")]
        public IActionResult UpdateComment(Models.Comment comment)
        {
            _context.UpdateComment(comment);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteComment/{id}")]
        public IActionResult DeleteComment(int id)
        {
            _context.DeleteComment(id);
            return Ok();
        }
    }
}
