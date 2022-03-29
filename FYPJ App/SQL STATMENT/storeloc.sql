create table dbo.Storeloc(
StoreId int identity(1,1),
StoreName varchar(500),
StoreStreet varchar(500),
StorePostalCode int,
StoreOpHrs varchar(500),
StorePh int,
Storelogo varchar(500)
)

drop table dbo.Storeloc
select * from dbo.Storeloc
Truncate table dbo.Storeloc

create procedure AllStoreloc as begin select * from dbo.Storeloc end
Drop Procedure AllStoreloc
AllStoreloc

Create procedure AddStoreloc (@StoreName varchar(500), @StoreStreet varchar(500),
@StorePostalCode int,@StoreOpHrs varchar(500),
@StorePh int,@Storelogo varchar(500))
as begin insert into dbo.Storeloc (StoreName,StoreStreet,StorePostalCode,StoreOpHrs,StorePh,Storelogo) values (@StoreName,@StoreStreet,
@StorePostalCode,@StoreOpHrs,@StorePh,@Storelogo) end
Drop Procedure AddStoreloc
AddStoreloc

Create procedure updateStoreloc (@StoreId int,@StoreName varchar(500),@StoreStreet varchar(500),
@StorePostalCode int,
@StorePh int,
@Storelogo varchar(500),@StoreOpHrs varchar(500))
as begin update dbo.Storeloc set StoreName=@StoreName,StoreStreet=@StoreStreet,
StorePostalCode=@StorePostalCode,StoreOpHrs=@StoreOpHrs,StorePh=@StorePh,Storelogo=@Storelogo where StoreId=@StoreId end
Drop Procedure updateStoreloc
updateStoreloc

Create procedure DeleteStoreloc(@StoreId int) as begin delete from dbo.Storeloc where StoreId=@StoreId end
Drop Procedure DeleteStoreloc
