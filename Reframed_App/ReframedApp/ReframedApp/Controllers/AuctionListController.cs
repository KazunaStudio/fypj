using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;

namespace BasicApp.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionListController : ControllerBase
    {
        //For saving data to database
        private readonly IConfiguration _configuration;

        //For saving images 
        private readonly IWebHostEnvironment _env;
        public AuctionListController(IConfiguration configuration, IWebHostEnvironment env)
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
                using (SqlCommand myCommand = new SqlCommand("AllAuctionInfo", myCon)) //call for procedure stored in database which display all data in the database table respectively
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
        public JsonResult Post(AuctionList Frames)
        {      
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("InsertAuctionInfo", myCon)) //call for procedure stored in database to add a data into the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@AuctionName", Frames.AuctionName);
                    myCommand.Parameters.AddWithValue("@UserName", Frames.UserName);
                    myCommand.Parameters.AddWithValue("@AuctionDes", Frames.AuctionDes);
                    myCommand.Parameters.AddWithValue("@AuctionType", Frames.AuctionType);
                    myCommand.Parameters.AddWithValue("@AuctionShape", Frames.AuctionShape); 
                    myCommand.Parameters.AddWithValue("@AuctionMaterial ", Frames.AuctionMaterial);
                    myCommand.Parameters.AddWithValue("@AuctionColour", Frames.AuctionColour);                    
                    myCommand.Parameters.AddWithValue("@AuctionEndDateTime", Frames.AuctionEndDateTime);
                    myCommand.Parameters.AddWithValue("@AuctionStartAmt", Frames.AuctionStartAmt);
                    myCommand.Parameters.AddWithValue("@AuctionEndAmt", Frames.AuctionEndAmt);
                    myCommand.Parameters.AddWithValue("@AuctionImg", Frames.AuctionImg);
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
        public JsonResult Put(AuctionList Frames)
        {               
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("UpdateAuctionInfo", myCon)) //call for procedure stored in database to update a data into the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@AuctionId", Frames.AuctionId);
                    myCommand.Parameters.AddWithValue("@AuctionName", Frames.AuctionName);
                    myCommand.Parameters.AddWithValue("@UserName", Frames.UserName); 
                    myCommand.Parameters.AddWithValue("@AuctionDes", Frames.AuctionDes);
                    myCommand.Parameters.AddWithValue("@AuctionType", Frames.AuctionType);
                    myCommand.Parameters.AddWithValue("@AuctionShape", Frames.AuctionShape);
                    myCommand.Parameters.AddWithValue("@AuctionMaterial ", Frames.AuctionMaterial);
                    myCommand.Parameters.AddWithValue("@AuctionColour", Frames.AuctionColour);
                    myCommand.Parameters.AddWithValue("@AuctionEndDateTime", Frames.AuctionEndDateTime);
                    myCommand.Parameters.AddWithValue("@AuctionStartAmt", Frames.AuctionStartAmt);
                    myCommand.Parameters.AddWithValue("@AuctionEndAmt", Frames.AuctionEndAmt);
                    myCommand.Parameters.AddWithValue("@AuctionImg", Frames.AuctionImg);
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
                using (SqlCommand myCommand = new SqlCommand("DeleteAuctionInfo", myCon))//call for procedure stored in database to delete a data in the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@AuctionId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
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

                return new JsonResult("empty.png");
            }
        }

    }
}
