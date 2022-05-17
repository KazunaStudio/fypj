using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class CartController : ControllerBase
    {
        //For saving data to database
        private readonly IConfiguration _configuration;

        //For saving images 
        private readonly IWebHostEnvironment _env;
        public CartController(IConfiguration configuration, IWebHostEnvironment env)
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
                using (SqlCommand myCommand = new SqlCommand("CartInfo", myCon)) //call for procedure stored in database which display all data in the database table respectively
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
        public JsonResult Post(Cart C)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("Addproduct", myCon)) //call for procedure stored in database to add a data in the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@BuyerId", C.BuyerId);
                    myCommand.Parameters.AddWithValue("@Buyername", C.Buyername);
                    myCommand.Parameters.AddWithValue("@SellerName", C.SellerName);
                    myCommand.Parameters.AddWithValue("@PId", C.PId);
                    myCommand.Parameters.AddWithValue("@PName", C.PName);
                    myCommand.Parameters.AddWithValue("@PAmt", C.PAmt);
                    myCommand.Parameters.AddWithValue("@PImg", C.PImg);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        //To delete all the data in the database table respectively
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ReframedAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("DeleteCart", myCon)) //call for procedure stored in database to delete all data in the table respectively
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.ExecuteNonQuery();

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
