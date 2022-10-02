using System;
using System.Collections.Generic;

namespace TaskManagementSystem.Models
{
    public partial class Task
    {
        public int Id { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? RequiredByDate { get; set; }
        public string? TaskDescription { get; set; }
        public string? TaskStatus { get; set; }
        public string? TaskType { get; set; }
        public string? AssignedUser { get; set; }
        public DateTime? NextActionDate { get; set; }
    }
}
