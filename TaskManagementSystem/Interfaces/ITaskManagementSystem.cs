using System;
namespace TaskManagementSystem.Interfaces
{
    public interface ITaskManagementSystem
    {
        List<Models.Task> GetTaskList();
        List<Models.User> GetUserList();
        Models.Task GetTaskData(int taskId);
        void AddTask(Models.Task task);
        void UpdateTask(Models.Task task);
        void DeleteTask(int taskId);
        List<Models.Comment> GetCommentList(int taskId);
        Models.Comment GetCommentData(int commentId);
        void AddComment(Models.Comment comment);
        void UpdateComment(Models.Comment comment);
        void DeleteComment(int commentId);
    }
}

