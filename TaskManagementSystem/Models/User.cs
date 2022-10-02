using System;
using System.Collections.Generic;

namespace TaskManagementSystem.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string? UserCode { get; set; }
        public string? UserName { get; set; }
    }
}
