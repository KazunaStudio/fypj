/*Create a table for Banner's Images*/
create table dbo.Bannerimages(
ImgId int identity(1,1),
Imgcaption varchar(500),
Bannerimg varchar(500)
)

/*Create procedure to select all information of Banner's Images*/
create procedure AllBanner as begin select * from dbo.Bannerimages end

/*Create procedure to Add a row in the table*/
Create procedure AddBanner (@Imgcaption varchar(500), @Bannerimg varchar(500))
as begin insert into dbo.Bannerimages (Imgcaption,Bannerimg) values (@Imgcaption,@Bannerimg) end

/*Create procedure to update a row in the table*/
Create procedure updateBanner (@ImgId int,@Imgcaption varchar(500), @Bannerimg varchar(500))
as begin update dbo.Bannerimages set Imgcaption=@Imgcaption,Bannerimg=@Bannerimg where ImgId=@ImgId end

/*Create procedure to delete a row in the table*/
Create procedure DeleteBanner(@ImgId int) as begin delete from dbo.Bannerimages where ImgId=@ImgId end