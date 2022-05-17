using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;

namespace ReframedApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FAQController : ControllerBase
    {
        //For saving data to database
        private readonly IConfiguration _configuration;
        public FAQController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //To call for data in the database table respectively to front-end
        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("AllFAQ", myCon)) //call for procedure stored in database which display all data in the database table respectively
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        //To add data to database table respectively
        [HttpPost]
        public JsonResult Post(FAQ faq)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("AddFAQ", myCon)) //call for procedure stored in database to add a data into the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@Question", faq.Question);
                    myCommand.Parameters.AddWithValue("@Answers", faq.Answers);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        //To update a data in the database table respectively
        [HttpPut]
        public JsonResult Put(FAQ faq)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("updateFAQ", myCon)) //call for procedure stored in database to update a data into the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@FAQId", faq.FAQId);
                    myCommand.Parameters.AddWithValue("@Question", faq.Question);
                    myCommand.Parameters.AddWithValue("@Answers", faq.Answers);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        //To delete a data in the database table respectively
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("DeleteFAQ", myCon)) //call for procedure stored in database to delete a data in the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@FAQId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
