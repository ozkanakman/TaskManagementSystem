using System;
using System.Collections.Generic;

namespace TaskManagementSystem.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public DateTime? DateAdded { get; set; }
        public string? CommentText { get; set; }
        public string? CommentType { get; set; }
        public DateTime? ReminderDate { get; set; }
    }
}
