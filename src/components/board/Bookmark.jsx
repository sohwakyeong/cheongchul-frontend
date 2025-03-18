const Bookmark = ({ detailData, setDetailData, id, fetchData })=> {
    const setBookmark = async () => {
        try {
          const method = detailData.bookmarked ? "DELETE" : "POST";
    
          const result = await fetchData(`/api/bookmark/${id}`, method);
    
          if (result.status === 201 || result.status === 200) {
            setDetailData((prevState) => ({
              ...prevState,
              bookmarked: !prevState.bookmarked,
            }));
            alert(
              result.status === 201
                ? "북마크가 추가되었습니다"
                : "북마크가 해지되었습니다."
            );
          } else {
            throw new Error("error", result.status);
          }
        } catch (error) {
          console.error("북마크 처리 오류", error);
          alert(error.message);
        }
      };
      return (
        <button onClick={setBookmark}>
        {detailData.bookmarked ? "찜 해제" : "찜하기"}
      </button>
      );
}

export default Bookmark;