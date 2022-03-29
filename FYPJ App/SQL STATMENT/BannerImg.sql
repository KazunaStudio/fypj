create table dbo.Bannerimages(
ImgId int identity(1,1),
Imgcaption varchar(500),
Bannerimg varchar(500)
)
drop table dbo.Bannerimages
select * from dbo.Bannerimages
Truncate table dbo.Bannerimages

create procedure AllBanner as begin select * from dbo.Bannerimages end
Drop Procedure AllBanner
AllBanner

Create procedure AddBanner (@Imgcaption varchar(500), @Bannerimg varchar(500))
as begin insert into dbo.Bannerimages (Imgcaption,Bannerimg) values (@Imgcaption,@Bannerimg) end
Drop Procedure AddBanner
AddBanner

Create procedure updateBanner (@ImgId int,@Imgcaption varchar(500), @Bannerimg varchar(500))
as begin update dbo.Bannerimages set Imgcaption=@Imgcaption,Bannerimg=@Bannerimg where ImgId=@ImgId end
Drop Procedure updateBanner
updateBanner

Create procedure DeleteBanner(@ImgId int) as begin delete from dbo.Bannerimages where ImgId=@ImgId end
Drop Procedure DeleteBanner