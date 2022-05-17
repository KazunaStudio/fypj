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
    public class CompanyInfoController : ControllerBase
    {
        //For saving data to database
        private readonly IConfiguration _configuration;

        //For saving images
        private readonly IWebHostEnvironment _env;
        public CompanyInfoController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
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
                using (SqlCommand myCommand = new SqlCommand("AllCompanyInfo", myCon)) //call for procedure stored in database which display all data in the database table respectively
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        //To update a data in the database table respectively
        [HttpPut]
        public JsonResult Put(CompanyInfo CInfo)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("updateCompanyInfo", myCon)) //call for procedure stored in database to update a data into the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@ID", CInfo.ID);
                    myCommand.Parameters.AddWithValue("@CompanyName", CInfo.CompanyName);
                    myCommand.Parameters.AddWithValue("@CompanyDes", CInfo.CompanyDes);
                    myCommand.Parameters.AddWithValue("@CompanyVision", CInfo.CompanyVision);
                    myCommand.Parameters.AddWithValue("@CompanyMission", CInfo.CompanyMission);
                    myCommand.Parameters.AddWithValue("@CompanyValue ", CInfo.CompanyValue);
                    myCommand.Parameters.AddWithValue("@CompanyLogo", CInfo.CompanyLogo);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        //To save image files to Images folder.
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Images/" + filename; //store image file into the Images folder

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                    
                return new JsonResult("REFRAMED.png");
            }
        }

    }
}
