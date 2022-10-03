using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TaskManagementSystem.Interfaces;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.DataAccess
{
    public class TaskManagementSystemDataAccessLayer : ITaskManagementSystem
    {

        private readonly TaskManagementContext db;

        public TaskManagementSystemDataAccessLayer(TaskManagementContext _db)
        {
            db = _db;
        }

        public List<Models.Task> GetTaskList()
        {
            try
            {
                List<Models.Task> taskList = new List<Models.Task>();
                taskList = db.Tasks.FromSqlRaw($"SELECT * FROM [Task]").ToList();
                return taskList;
            }
            catch
            {
                throw;
            }
        }

        public List<Models.User> GetUserList()
        {
            try
            {
                List<Models.User> userList = new List<Models.User>();
                userList = (from UserList in db.Users select UserList).ToList();
                return userList;
            }
            catch
            {
                throw;
            }
        }

        public Models.Task GetTaskData(int taskId)
        {
            try
            {
                var columnName = "Id";
                var columnValue = new SqlParameter("columnValue", taskId);
                Models.Task task = db.Tasks.FromSqlRaw($"SELECT * FROM [Task] WHERE {columnName} = @columnValue", columnValue).First();
                return task;
            }
            catch
            {
                throw;
            }
        }

        public void AddTask(Models.Task task)
        {
            try
            {
                db.Tasks.Add(task);
                db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void UpdateTask(Models.Task task)
        {
            try
            {
                var columnName = "TaskId";
                var columnValue = new SqlParameter("columnValue", task.Id);
                Models.Comment comment = db.Comments.FromSqlRaw($"SELECT * FROM [Comment] WHERE {columnName} = @columnValue AND ReminderDate > getdate()", columnValue).OrderBy(c => c.ReminderDate).FirstOrDefault();
                if (comment != null)
                    task.NextActionDate = comment.ReminderDate;

                db.Entry(task).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void DeleteTask(int id)
        {
            try
            {
                List<Models.Comment> comments = GetCommentList(id);
                db.Comments.RemoveRange(comments);

                var columnName = "Id";
                var columnValue = new SqlParameter("columnValue", id);
                Models.Task task = db.Tasks.FromSqlRaw($"SELECT * FROM [Task] WHERE {columnName} = @columnValue", columnValue).First();

                if (task == null)
                    return;
                db.Tasks.Remove(task);
                db.SaveChanges();

            }
            catch
            {
                throw;
            }
        }

        public List<Models.Comment> GetCommentList(int taskId)
        {
            try
            {
                var columnName = "TaskId";
                var columnValue = new SqlParameter("columnValue", taskId);
                List<Models.Comment> commentList = new List<Models.Comment>();
                commentList = db.Comments.FromSqlRaw($"SELECT * FROM [Comment] WHERE {columnName} = @columnValue", columnValue).ToList();
                return commentList;
            }
            catch
            {
                throw;
            }
        }

        public Models.Comment GetCommentData(int commentId)
        {
            try
            {
                var columnName = "Id";
                var columnValue = new SqlParameter("columnValue", commentId);
                Models.Comment comment = db.Comments.FromSqlRaw($"SELECT * FROM [Comment] WHERE {columnName} = @columnValue", columnValue).First();
                return comment;
            }
            catch
            {
                throw;
            }
        }

        public void AddComment(Models.Comment comment)
        {
            try
            {
                db.Comments.Add(comment);
                db.SaveChanges();

                UpdateTask(GetTaskData(comment.TaskId));
            }
            catch
            {
                throw;
            }
        }

        public void UpdateComment(Models.Comment comment)
        {
            try
            {
                db.Entry(comment).State = EntityState.Modified;
                db.SaveChanges();

                UpdateTask(GetTaskData(comment.TaskId));
            }
            catch
            {
                throw;
            }
        }

        public void DeleteComment(int id)
        {
            try
            {
                var columnName = "Id";
                var columnValue = new SqlParameter("columnValue", id);
                Models.Comment comment = db.Comments.FromSqlRaw($"SELECT * FROM [Comment] WHERE {columnName} = @columnValue", columnValue).First();

                if (comment == null)
                    return;
                db.Comments.Remove(comment);
                db.SaveChanges();

            }
            catch
            {
                throw;
            }
        }

    }
}

